from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.postgres.aggregates import ArrayAgg
from .models import User, Tour, Booking, CityDeparture, Country
from .serializers import UserSerializer, TourSerializer, BookingSerializer, TourDetailSerializer, \
    CityDepartureSerializer, CountrySerializer


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TourViewSet(viewsets.ModelViewSet):
    queryset = (Tour.objects.all())
    serializer_class = TourSerializer


class TourDetailViewSet(viewsets.ModelViewSet):
    #queryset = Tour.objects.annotate(images=ArrayAgg('TourImages__images', distinct=True))
    serializer_class = TourDetailSerializer

    def get_queryset(self):
        return Tour.objects.annotate(
            images=ArrayAgg('TourImages__images', distinct=True)
        )

    def get_serializer_context(self):
        return {'request': self.request}


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class CityDepartureViewSet(viewsets.ModelViewSet):
    queryset = CityDeparture.objects.all()
    serializer_class = CityDepartureSerializer


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
