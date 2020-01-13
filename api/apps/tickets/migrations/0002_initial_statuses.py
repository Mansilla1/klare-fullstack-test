from django.db import migrations

from apps.tickets.models import Status


def add_initial_statuses(apps, schema_editor):
    """
    Before to start everything, we need basic statuses created.
    :param apps:
    :param schema_editor:
    :return:
    """
    status_model = apps.get_model('tickets', 'Status')

    initial_statuses = (
        Status.PENDING,
        Status.COMPLETED,
    )
    status_model.objects.bulk_create([
        status_model(status=status)
        for status in initial_statuses
    ])


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_initial_statuses),
    ]
