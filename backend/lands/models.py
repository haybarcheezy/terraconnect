from django.db import models
from django.db.models import JSONField
from django.contrib.auth import get_user_model
from django.utils import timezone


class Land(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=200, default='')
    acreage = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    address = models.CharField(max_length=200, null=True, blank=True)
    extra_fields = JSONField(null=True, blank=True)
    image = models.ImageField(upload_to='property_images/', null=True, blank=True)
    last_updated = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.last_updated = timezone.now()
        super(Land, self).save(*args, **kwargs)