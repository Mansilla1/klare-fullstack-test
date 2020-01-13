from django.urls import path

from apps.tickets import views


app_name = 'tickets'

urlpatterns = [
    path(
        'status/',
        views.StatusList.as_view(),
        name='status',
    ),
    path(
        'tickets/',
        views.TicketsList.as_view(),
        name='tickets',
    ),
    path(
        'tickets/<int:ticket_id>/',
        views.TicketsDetails.as_view(),
        name='tickets-detail',
    ),
]
