# Generated by Django 5.0.6 on 2024-07-21 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0008_product_available_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='confirmedorder',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
