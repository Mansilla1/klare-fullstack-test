# Generated by Django 2.2.4 on 2020-01-05 22:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(choices=[('pending', 'Pendiente'), ('completed', 'Completado')], default='pending', max_length=50, unique=True)),
            ],
            options={
                'db_table': 'status',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='tickets.Status')),
            ],
            options={
                'db_table': 'tickets',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='TicketHistory',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
                ('status', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='tickets.Status')),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='tickets.Ticket')),
            ],
            options={
                'db_table': 'tickets_history',
                'managed': True,
            },
        ),
    ]