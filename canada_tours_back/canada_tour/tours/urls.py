from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
# Регистрируем пути взаимодействия
# Пользователи
router.register(r'users', UserViewSet)
# Туры
router.register(r'tours', TourViewSet)
# Брони
router.register(r'bookings', BookingViewSet)
# Детали туров
router.register(r'tours-detail', TourDetailViewSet, basename='tours-detail')
# Существующие города
router.register(r'cities', CityDepartureViewSet, basename='cities')
# Существующие страны
router.register(r'countries', CountryViewSet, basename='countries')
# Фильтрованные туры
router.register(r'filtered-tours', FilteredToursViewSet, basename='filtered-tours')

urlpatterns = [
    path('api/', include(router.urls)),
]

