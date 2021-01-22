import uuid

from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import DashboardSerializer
from .models import Dashboard
from .permissions import IsPublicOrAuthenticatedOwner

class DashboardViewSet(viewsets.ModelViewSet):

    # Used for AnonimousUsers
    queryset = Dashboard.objects.all()
    serializer_class = DashboardSerializer

    def perform_create(self, serializer):
        """
        Add the current authenticated user, the one that is creating it,
        to the dashboard.
        """
        serializer.save(user=self.request.user)

    def get_queryset(self):
        """
        Retrieves only the dashboards the current authenticated user
        has created. If user is an AnonymousUser we use all() isntead.
        """
        if self.request.user.is_authenticated and self.action == 'list':
            return self.request.user.dashboard_set.all()
        return self.queryset

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'retrieve':
            permission_classes = [IsPublicOrAuthenticatedOwner]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
   
    @action(detail=True, methods=['POST'])    
    def share(self, request, pk=None):
        """
        Truns a dashboard into 'public', or, if a set of data
        about the users we want to share it with is passed, then
        we agregate them to the list of users the dashboard is 
        shared with.
        """
        dashboard = self.get_object()
        share_with = request.data.get('share_with')
        if share_with is not None:
            pass
        else:
            # Then we change the dashboard from private
            # to public
            dashboard.is_public = True
            dashboard.public_url = uuid.uuid4()
            dashboard.save()
            return Response({
                'status': 'SUCCESS',
                'message': 'Dashboard \'{}\' is public now'.format(dashboard.name)
            })

