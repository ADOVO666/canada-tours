from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    RegisterView, LoginView,
    UserViewSet, TourViewSet, BookingViewSet,
    TourDetailViewSet, CityDepartureViewSet, CountryViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'tours', TourViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'tours-detail', TourDetailViewSet, basename='tours_detail')
router.register(r'cities', CityDepartureViewSet, basename='cities')
router.register(r'countries', CountryViewSet, basename='countries')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
]
