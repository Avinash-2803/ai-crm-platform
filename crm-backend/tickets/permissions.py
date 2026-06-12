from rest_framework.permissions import BasePermission


class TicketPermission(BasePermission):

    def has_permission(self, request, view):

        role = request.user.role

        if role == "ADMIN":
            return True

        if role == "AGENT":
            return True

        if role == "CUSTOMER":

            if view.action in [
                "list",
                "retrieve",
                "create"
            ]:
                return True

        return False