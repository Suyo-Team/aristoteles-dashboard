from .models import Dashboard
from rest_framework import serializers
from .models import Dashboard


class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = '__all__'
        read_only_fields = ['user']
