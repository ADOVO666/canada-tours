# Generated by Django 5.2rc1 on 2025-04-02 18:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tours', '0002_alter_tour_current_tickets'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tour',
            name='category',
        ),
        migrations.AddField(
            model_name='tour',
            name='type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='Category', to='tours.category', verbose_name='Категория'),
        ),
    ]
