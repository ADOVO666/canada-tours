from django.core.exceptions import ObjectDoesNotExist
from django.contrib.postgres.aggregates import ArrayAgg
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .models import User, Tour, Booking, CityDeparture, Country
from .serializers import (
    UserSerializer,
    TourSerializer,
    BookingSerializer,
    TourDetailSerializer,
    CityDepartureSerializer,
    CountrySerializer
)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user_id': user.id
            })
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

class UserView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TourViewSet(viewsets.ModelViewSet):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer

class TourDetailViewSet(viewsets.ModelViewSet):
    serializer_class = TourDetailSerializer

    def get_queryset(self):
        return Tour.objects.annotate(images=ArrayAgg('TourImages__images', distinct=True))

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
