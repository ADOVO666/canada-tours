from django.contrib import admin
from .models import Country, Tour, TourImages, Category, CityDeparture, Booking, User

# Register your models here.
admin.site.register(Country)
admin.site.register(Category)
admin.site.register(CityDeparture)
admin.site.register(Booking)
admin.site.register(User)

# Возможность добавлять несколько картинок к одному туру
class TourImagesAdmin(admin.StackedInline):
    model = TourImages

@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    inlines = [TourImagesAdmin]

    class Meta:
        model = Tour

@admin.register(TourImages)
class PostImageAdmin(admin.ModelAdmin):
    pass