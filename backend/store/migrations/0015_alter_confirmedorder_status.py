# Generated by Django 5.0.6 on 2024-08-04 10:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0014_alter_confirmedorder_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='confirmedorder',
            name='status',
            field=models.BooleanField(default=False),
        ),
    ]
