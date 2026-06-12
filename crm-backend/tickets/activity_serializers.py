from rest_framework import serializers
from .models import TicketActivity


class TicketActivitySerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = TicketActivity
        fields = "__all__"