from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .tasks import ticket_created_notification
from .ai_service import classify_ticket

import json

from accounts.models import User
from customers.models import Customer

from utils.redis_client import redis_client

from .models import Ticket, TicketActivity
from .serializers import TicketSerializer
from .permissions import TicketPermission

from .activity_serializers import TicketActivitySerializer


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated, TicketPermission]

    def perform_create(self, serializer):
        ticket = serializer.save()

        TicketActivity.objects.create(
            ticket=ticket,
            activity="Ticket Created"
        )

        try:
            ai_result = classify_ticket(ticket.title, ticket.description)

            ticket.category = ai_result.get("category", "General")
            ticket.priority = ai_result.get("priority", "MEDIUM")
            ticket.save()

            print("AI RESULT:", ai_result)

        except Exception as e:
            print("AI Classification Error:", str(e))

        ticket_created_notification.delay(ticket.id)
        redis_client.delete("dashboard_data")

    @action(detail=True, methods=["POST"])
    def assign_agent(self, request, pk=None):
        if request.user.role != "ADMIN":
            return Response(
                {"error": "Only Admin can assign agents"},
                status=status.HTTP_403_FORBIDDEN
            )

        ticket = self.get_object()
        agent_id = request.data.get("agent_id")

        try:
            agent = User.objects.get(id=agent_id, role="AGENT")
        except User.DoesNotExist:
            return Response(
                {"error": "Agent not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        ticket.assigned_agent = agent
        ticket.save()

        TicketActivity.objects.create(
            ticket=ticket,
            activity=f"Assigned to agent {agent.username}"
        )

        redis_client.delete("dashboard_data")

        return Response({"message": f"Ticket assigned to {agent.username}"})

    @action(detail=False, methods=["GET"])
    def my_tickets(self, request):
        if request.user.role != "AGENT":
            return Response(
                {"error": "Only agents can access this endpoint"},
                status=status.HTTP_403_FORBIDDEN
            )

        tickets = Ticket.objects.filter(assigned_agent=request.user)
        serializer = self.get_serializer(tickets, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["POST"])
    def update_status(self, request, pk=None):
        if request.user.role != "AGENT":
            return Response(
                {"error": "Only agents can update status"},
                status=status.HTTP_403_FORBIDDEN
            )

        ticket = self.get_object()
        if ticket.assigned_agent != request.user:
            return Response(
                {"error": "This ticket is not assigned to you"},
                status=status.HTTP_403_FORBIDDEN
            )

        new_status = request.data.get("status")
        valid_statuses = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]

        if new_status not in valid_statuses:
            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST
            )

        old_status = ticket.status
        ticket.status = new_status
        ticket.save()

        TicketActivity.objects.create(
            ticket=ticket,
            activity=f"Status changed from {old_status} to {new_status}"
        )

        redis_client.delete("dashboard_data")

        return Response({"message": f"Ticket status updated to {new_status}"})

    @action(detail=True, methods=["GET"])
    def activities(self, request, pk=None):
        ticket = self.get_object()
        activities = ticket.activities.all().order_by("-created_at")
        serializer = TicketActivitySerializer(activities, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["GET"])
    def dashboard(self, request):
        if request.user.role != "ADMIN":
            return Response(
                {"error": "Only Admin can access dashboard"},
                status=status.HTTP_403_FORBIDDEN
            )

        cached_data = redis_client.get("dashboard_data")
        if cached_data:
            return Response(json.loads(cached_data))

        total_customers = Customer.objects.count()
        total_tickets = Ticket.objects.count()
        open_tickets = Ticket.objects.filter(status="OPEN").count()
        in_progress_tickets = Ticket.objects.filter(status="IN_PROGRESS").count()
        resolved_tickets = Ticket.objects.filter(status="RESOLVED").count()
        closed_tickets = Ticket.objects.filter(status="CLOSED").count()
        billing_tickets = Ticket.objects.filter(category="Billing").count()
        technical_tickets = Ticket.objects.filter(category="Technical").count()
        product_tickets = Ticket.objects.filter(category="Product").count()
        delivery_tickets = Ticket.objects.filter(category="Delivery").count()
        account_tickets = Ticket.objects.filter(category="Account").count()
        general_tickets = Ticket.objects.filter(category="General").count()

        data = {
            "total_customers": total_customers,
            "total_tickets": total_tickets,
            "open_tickets": open_tickets,
            "in_progress_tickets": in_progress_tickets,
            "resolved_tickets": resolved_tickets,
            "closed_tickets": closed_tickets,
            "billing_tickets": billing_tickets,
            "technical_tickets": technical_tickets,
            "product_tickets": product_tickets,
            "delivery_tickets": delivery_tickets,
            "account_tickets": account_tickets,
            "general_tickets": general_tickets,
        }

        redis_client.setex("dashboard_data", 60, json.dumps(data))
        return Response(data)
