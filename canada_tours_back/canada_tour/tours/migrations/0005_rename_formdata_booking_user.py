# Generated by Django 5.2rc1 on 2025-04-02 21:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tours', '0004_rename_user_booking_formdata'),
    ]

    operations = [
        migrations.RenameField(
            model_name='booking',
            old_name='formData',
            new_name='user',
        ),
    ]
