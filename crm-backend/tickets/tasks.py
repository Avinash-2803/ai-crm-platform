from celery import shared_task

from django.core.mail import send_mail


@shared_task
def ticket_created_notification(ticket_id):

    send_mail(
        subject="Ticket Created",
        message=f"Your ticket #{ticket_id} has been created successfully.",
        from_email="avinashjoshi2803@gmail.com",
        recipient_list=[
            "avinashjoshi2803@gmail.com"
        ],
        fail_silently=False,
    )

    return True