from django.db import models

from . import (
    Status,
    Ticket,
)


class TicketHistory(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField()

    ticket = models.ForeignKey(
        to=Ticket,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )
    status = models.ForeignKey(
        to=Status,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    class Meta:
        managed = True
        db_table = 'tickets_history'
