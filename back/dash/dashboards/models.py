from django.db import models
from core.models import User
# Create your models here.


class Dashboard(models.Model):
    """
    Dashboards are simple records with an URL pointing to
    a dashboar from another service, which will be rendered
    in the frot end platform.
    """
    name = models.CharField(max_length=200)
    url = models.URLField(max_length=200)
    user = models.ForeignKey(
        'core.User',
        on_delete=models.CASCADE,
        null=True
    )
    # Dashboards with this attribute set to true
    # can be accessed by anyone.
    is_public = models.BooleanField(default=False)
    public_url = models.UUIDField(editable=False, null=True, default=None)


