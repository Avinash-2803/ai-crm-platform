from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    RegisterView,
    ProfileView,
    AdminDashboardView,
    AgentDashboardView,
    CustomerDashboardView,
    AgentListView,
)

urlpatterns = [

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="login"
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="refresh"
    ),

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile"
    ),

    path(
        "admin-dashboard/",
        AdminDashboardView.as_view(),
        name="admin-dashboard"
    ),

    path(
        "agent-dashboard/",
        AgentDashboardView.as_view(),
        name="agent-dashboard"
    ),

    path(
        "customer-dashboard/",
        CustomerDashboardView.as_view(),
        name="customer-dashboard"
    ),

    path(
        "agents/",
        AgentListView.as_view(),
        name="agents"
    ),
]