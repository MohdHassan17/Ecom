# Generated by Django 5.0.6 on 2024-07-14 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_cart_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.URLField(null=True),
        ),
    ]
