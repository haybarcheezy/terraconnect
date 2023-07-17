from rest_framework import serializers
from .models import Land


class LandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Land
        fields = ['id', 'name', 'acreage', 'address', 'extra_fields', 'image', 'last_updated' ]


class BulkUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
