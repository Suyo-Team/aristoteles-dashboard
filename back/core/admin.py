from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


# Register your models here.
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'name', 'is_staff', 'is_superuser']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('name',)}),
        (
            _('Permissions'),
            {'fields': ('is_active', 'is_staff', 'is_superuser')}
        ),
        (_('Groups'), {'fields': ('groups',)})
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )
    fields_horizontals = ['groups']
