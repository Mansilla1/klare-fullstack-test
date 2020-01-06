from rest_framework.generics import ListAPIView

from apps.tickets.models import Status
from apps.tickets.serializers import StatusSerializer


class StatusList(ListAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer
