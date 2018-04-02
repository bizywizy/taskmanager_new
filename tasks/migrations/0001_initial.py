# Generated by Django 2.0.2 on 2018-03-25 13:04

from django.db import migrations, models
import tasks.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('done', models.DateTimeField(blank=True, default=None, null=True)),
                ('position', models.IntegerField(default=tasks.models.last_plus_1)),
            ],
        ),
    ]