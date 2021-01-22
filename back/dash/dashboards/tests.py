from typing import Optional, NewType

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient, force_authenticate
from rest_framework import status

from faker import Factory

from .models import Dashboard
from .serializers import DashboardSerializer

UserType = NewType('UserType', get_user_model())


faker = Factory.create()

DASHBOARD_URL_NAME = 'dashboards-list'


def sample_user(email: Optional[str] = 'test@test.com',
                password: Optional[str] = 'test123') -> UserType:
    """Creates a sample user"""
    return get_user_model().objects.create_user(email, password)


class UserModelsTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new user with email is successful"""
        email = 'test@test.com'
        password = 'test123'
        user = sample_user(email=email, password=password)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalized"""
        email = 'test@TEST.cOm'
        user = sample_user(email=email)

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            sample_user(email=None)

    def test_create_new_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            'test@test.com',
            'test123'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)


class DashboardViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url_dashboards = reverse(DASHBOARD_URL_NAME)
        self.user_one = sample_user()
        self.user_two = sample_user(email=faker.email())
        
        self.dashboard_user_one = Dashboard.objects.create(
            name=faker.name(),
            url=faker.url(),
            user=self.user_one
        )
        self.dashboard_user_two = Dashboard.objects.create(
            name=faker.name(),
            url=faker.url(),
            user=self.user_two
        )
        self.dashboard_public_user_two = Dashboard.objects.create(
            name=faker.name(),
            url=faker.url(),
            user=self.user_two,
            is_public=True
        )

    def test_list_not_authenticated_user_no_results(self):
        """
        List action for unauthenticated users may raise a 401 Unauthorized error
        """
        res = self.client.get(self.url_dashboards, format='json')

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)        

    def test_list_authenticated_user_dashboards(self):
        """
        List action must retrieve only the dashboard that the
        current authenticated user has created. It won't list
        dashboards from other users regardless they're public.
        """
        self.client.force_authenticate(self.user_one)
        res = self.client.get(self.url_dashboards, format='json')
        
        dashboards = Dashboard.objects.filter(user=self.user_one)
        serializer = DashboardSerializer(dashboards, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data.get('results')), 1)
        self.assertEqual(res.data.get('results'), serializer.data)

