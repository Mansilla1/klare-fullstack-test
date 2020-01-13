from django.db import models

from . import Status


class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    status = models.ForeignKey(
        to=Status,
        on_delete=models.DO_NOTHING,
        null=False,
        blank=False,
    )

    class Meta:
        managed = True
        db_table = 'tickets'
