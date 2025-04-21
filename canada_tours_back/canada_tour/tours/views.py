from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.postgres.aggregates import ArrayAgg
from .models import User, Tour, Booking, CityDeparture, Country
from .serializers import UserSerializer, TourSerializer, BookingSerializer, TourDetailSerializer, \
    CityDepartureSerializer, CountrySerializer

from django.db.models import F, ExpressionWrapper, IntegerField


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


class FilteredToursViewSet(viewsets.ModelViewSet):
    serializer_class = TourSerializer

    def get_queryset(self):
        allowed_fields = [
            'type', # тип экскурсии
            'duration', # сколько дней идет
        ]
        queryset = Tour.objects.annotate(
            available_tickets=ExpressionWrapper(
                F('max_tickets') - F('current_tickets'),
                output_field=IntegerField()
            )
        )
        raw_params = self.request.query_params # собрали параметры из запроса

        # тут создали словарь фильтров: key берём из запросов и если он в списке
        # разрешённых, то добавляем в словарь со значением, которое под ним отправили
        # сделал в целях безопасности
        filters = {key: raw_params[key] for key in raw_params if key in allowed_fields}
        if 'available_tickets' in raw_params:
            filters.update({'available_tickets__gte': raw_params['available_tickets']})
        if 'destination' in raw_params:
            filters.update({'destination__name__icontains': raw_params['destination']})
        if 'location' in raw_params:
            filters.update({'location__name__icontains': raw_params['location']})
        queryset = queryset.filter(**filters)

        return queryset



class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class CityDepartureViewSet(viewsets.ModelViewSet):
    queryset = CityDeparture.objects.all()
    serializer_class = CityDepartureSerializer


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer
