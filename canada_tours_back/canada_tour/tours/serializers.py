from rest_framework import serializers
from django.contrib.postgres.aggregates import ArrayAgg
from django.contrib.auth import authenticate
from .models import User, Tour, Booking, CityDeparture, Country


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'name', 'phone', 'serial', 'number']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            phone=validated_data['phone'],
            serial=validated_data['serial'],
            number=validated_data['number']
        )
        return user

class TourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tour
        fields = '__all__'


class TourDetailSerializer(serializers.ModelSerializer):
    images = (serializers.SerializerMethodField())
              #ListField(child=serializers.SlugField()))

    def get_images(self, obj):
        request = self.context.get('request')
        image_paths = obj.images or []
        return [
            request.build_absolute_uri(f'/media/{path}') for path in image_paths
        ]

    class Meta:
        model = Tour
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


class CityDepartureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityDeparture
        fields = ('name',)


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('name',)



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Неверные учетные данные")