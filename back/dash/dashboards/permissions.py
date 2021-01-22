from rest_framework import permissions

class IsPublicOrAuthenticatedOwner(permissions.BasePermission):
    """
    Object-level permission that allows any request to 'public' objects
    to READ the information. Assuming object has an 'is_public' attribute.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS and obj.is_public:
            return True
        if request.user.is_authenticated and request.user == obj.user:
            return True        
        return False