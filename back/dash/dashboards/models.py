from django.db import models
from core.models import User
# Create your models here.


class Dashboard(models.Model):
    name = models.CharField(max_length=200)
    url = models.URLField(max_length=200)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)
