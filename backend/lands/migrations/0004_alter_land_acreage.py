# Generated by Django 4.2.3 on 2023-07-13 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lands', '0003_alter_land_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='land',
            name='acreage',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True),
        ),
    ]
