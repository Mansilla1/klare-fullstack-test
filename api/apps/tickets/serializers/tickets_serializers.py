from rest_framework import serializers

from apps.tickets.models import Ticket


class TicketsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
