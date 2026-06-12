from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer
from .permissions import (
    IsAdmin,
    IsAgent,
    IsCustomer
)
from .models import User


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "role": request.user.role,
            "email": request.user.email
        })


class AdminDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]

    def get(self, request):

        return Response({
            "message": "Welcome Admin"
        })


class AgentDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAgent
    ]

    def get(self, request):

        return Response({
            "message": "Welcome Agent"
        })


class CustomerDashboardView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCustomer
    ]

    def get(self, request):

        return Response({
            "message": "Welcome Customer"
        })


class AgentListView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        if request.user.role != "ADMIN":
            return Response(
                {
                    "error": "Only Admin can access"
                },
                status=403
            )

        agents = User.objects.filter(
            role="AGENT"
        )

        data = []

        for agent in agents:
            data.append({
                "id": agent.id,
                "username": agent.username
            })

        return Response(data)