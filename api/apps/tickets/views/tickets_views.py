from django.shortcuts import get_object_or_404
from rest_framework import mixins
from rest_framework import generics
from rest_framework.renderers import JSONRenderer

from apps.tickets.models import (
    Status,
    Ticket,
)
from apps.tickets.serializers import TicketsSerializer


class TicketsList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    renderer_classes = [JSONRenderer]

    queryset = Ticket.objects.all()
    serializer_class = TicketsSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        status, _ = Status.objects.get_or_create(status=Status.PENDING)
        request.data['status'] = status.pk
        return self.create(request, *args, **kwargs)


class TicketsDetails(generics.RetrieveUpdateAPIView, generics.RetrieveDestroyAPIView):
    serializer_class = TicketsSerializer
    lookup_field = 'ticket_id'

    def get_object(self):
        ticket_id = self.kwargs['ticket_id']
        return get_object_or_404(Ticket, pk=ticket_id)
