from django.db import models


class Status(models.Model):
    PENDING = 'pending'
    COMPLETED = 'completed'
    STATUSES = (
        (PENDING, 'Pendiente'),
        (COMPLETED, 'Completado'),
    )

    id = models.AutoField(primary_key=True)
    status = models.CharField(
        max_length=50,
        choices=STATUSES,
        default=PENDING,
        null=False,
        unique=True,
    )

    class Meta:
        managed = True
        db_table = 'status'
