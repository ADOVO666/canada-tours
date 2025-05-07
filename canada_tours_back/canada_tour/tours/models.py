from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


# Create your models here.

class User(models.Model):
    """Пользователь"""
    name = models.CharField("ФИО", max_length=100, unique=False)
    serial = models.IntegerField(verbose_name="Серия паспорта", blank=False, null=False, default=1234)
    number = models.IntegerField(verbose_name="Номер паспорта", blank=False, null=False, default=123456)
    phone = PhoneNumberField(region='RU', verbose_name="Телефон", blank=False, null=False, )
    email = models.EmailField("Электронная почта", blank=False, null=False, default=None,
                              help_text="Пример: user@example.com")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'


class Country(models.Model):
    """Страны где проводятся туры и экскурсии"""
    name = models.CharField("Название страны", max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Страна'
        verbose_name_plural = 'Страны'


class CityDeparture(models.Model):
    """Город отправления"""
    name = models.CharField("Название города", max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Город отправления'
        verbose_name_plural = 'Города отправления'


class Category(models.Model):
    """Категории туров"""
    name = models.CharField("Название категории", max_length=100, unique=True)
    description = models.TextField("Описание", blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория тура или экскурсии'
        verbose_name_plural = 'Категории туров или экскурсий'


class Tour(models.Model):
    """Туры и Экскурсии"""
    title = models.CharField("Название тура или экскурсии", max_length=150)
    description = models.TextField("Описание")
    url = models.SlugField(max_length=160, unique=True)
    image = models.ImageField("Изображение", upload_to="tours/")
    # Локация
    destination = models.ForeignKey(Country, on_delete=models.PROTECT,
                                verbose_name="Страна где проводится тур или экскурсия", related_name='CountryTour')
    location = models.ForeignKey(CityDeparture, on_delete=models.PROTECT, verbose_name="Город отправления",
                             related_name='CityDeparture')
    type = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name="Категория", related_name='Category',
                                 null=True, blank=True)

    # Цена
    price = models.FloatField("Цена", default=0.0, help_text="Цена в рублях")

    # Длительность дни
    duration = models.IntegerField(verbose_name="Длительность (дни)", help_text="Количество дней тура или экскурсии",
                                   default=25, null=True, blank=False)

    # Места
    max_tickets = models.IntegerField(verbose_name="Максимальное кол-во мест", help_text="Максимальное количество мест",
                                    default=10, null=True, blank=False)
    current_tickets = models.IntegerField(verbose_name="Кол-во занятых мест", help_text="Текущее количество мест",
                                        default=10, null=True, blank=False)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Тур и Экскурсия'
        verbose_name_plural = 'Туры и Экскурсии'


class TourImages(models.Model):
    tour = models.ForeignKey(Tour, default=None,
                             on_delete=models.CASCADE,
                             verbose_name='Дополнительные изображения тура',
                             related_name='TourImages')
    images = models.ImageField(upload_to='tours/')


class Booking(models.Model):
    """Бронирование Тура или Экскурсии"""
    tourTitle = models.ForeignKey(Tour, on_delete=models.PROTECT,
                                  verbose_name="Выбранный тур или экскурсия",
                                  related_name='booking_tour')
    formData = models.ForeignKey(User, on_delete=models.PROTECT,
                                 verbose_name="Пользователь",
                                 related_name='booking_user')
    # Места
    amount_tickets = models.IntegerField(verbose_name="Сколько мест забронировать?",
                                         help_text="Бронирование места",
                                         default=1, null=False, blank=False)

    def __str__(self):
        return f"{self.formData.name} — {self.tourTitle.title}"

    class Meta:
        verbose_name = 'Бронирование тура или экскурсии'
        verbose_name_plural = 'Бронирование туров или экскурсий'