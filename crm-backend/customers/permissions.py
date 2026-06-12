from rest_framework.permissions import BasePermission


class CustomerPermission(BasePermission):

    def has_permission(self, request, view):

        role = request.user.role

        if role == "ADMIN":
            return True

        if role == "AGENT":

            if request.method in [
                "GET",
                "HEAD",
                "OPTIONS"
            ]:
                return True

        return False