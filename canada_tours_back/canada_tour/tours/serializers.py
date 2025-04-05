from rest_framework import serializers
from django.contrib.postgres.aggregates import ArrayAgg
from .models import User, Tour, Booking

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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