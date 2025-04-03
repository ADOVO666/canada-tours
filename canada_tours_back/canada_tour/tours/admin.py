from django.contrib import admin
from .models import Country, Tour, Category, CityDeparture, Booking, User

# Register your models here.
admin.site.register(Country)
admin.site.register(Tour)
admin.site.register(Category)
admin.site.register(CityDeparture)
admin.site.register(Booking)
admin.site.register(User)