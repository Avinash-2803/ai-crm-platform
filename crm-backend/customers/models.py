from django.db import models


class Customer(models.Model):

    name = models.CharField(max_length=255)

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=15)

    company = models.CharField(max_length=255)

    industry = models.CharField(max_length=255)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.name
