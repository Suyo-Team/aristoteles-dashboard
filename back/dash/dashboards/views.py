import uuid

from django.http import Http404

from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404

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

    def get_object(self):
        """
        Returns the object the view is displaying.

        It's being overriden so we can get the same dashboard either if we pass the
        primari key ID or the public_url UUID
        """
        queryset = self.filter_queryset(self.get_queryset())
        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        assert lookup_url_kwarg in self.kwargs, (
            'Expected view %s to be called with a URL keyword argument '
            'named "%s". Fix your URL conf, or set the `.lookup_field` '
            'attribute on the view correctly.' %
            (self.__class__.__name__, lookup_url_kwarg)
        )
        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        
        # We can pass either the primary key of the dashboard, Or
        # the public_url uuid
        try:
            obj = get_object_or_404(queryset, **filter_kwargs)
        except Http404:
            #  Now we try with the public url
            obj = get_object_or_404(queryset, **{'public_url': self.kwargs[lookup_url_kwarg]})

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj
   
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
        set_private = bool(request.data.get('set_private', False))        
        if set_private:
            # Then we change the dashboard from public
            # to private
            dashboard.is_public = False
            dashboard.public_url = None
            dashboard.save()
            return Response({
                'status': 'SUCCESS',
                'message': 'Dashboard \'{}\' is no longer public'.format(dashboard.name)
            })
        elif share_with is not None:
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

