from rest_framework import serializers

from apps.tickets.models import Status


class StatusSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = Status
        fields = (
            'id',
            'status',
            'display_name',
        )
        read_only_fields = ('id', )

    def get_display_name(self, obj):
        return obj.get_status_display()
