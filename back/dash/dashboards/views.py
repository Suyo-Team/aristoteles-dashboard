from django.shortcuts import render
from .models import Dashboard
from rest_framework import viewsets
from dashboards.serializers import DashboardSerializer


class DashboardViewSet(viewsets.ModelViewSet):

    serializer_class = DashboardSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.dashboard_set.all()
