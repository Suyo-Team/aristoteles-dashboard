from django.contrib import admin
from .models import Dashboard


class DashboardAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')


admin.site.register(Dashboard, DashboardAdmin)
