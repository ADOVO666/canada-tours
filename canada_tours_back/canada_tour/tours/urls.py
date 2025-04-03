from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TourViewSet, BookingViewSet

router = DefaultRouter()
# Регистрируем пути взаимодействия
# Пользователи
router.register(r'users', UserViewSet)
# Туры
router.register(r'tours', TourViewSet)
# Брони
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]

