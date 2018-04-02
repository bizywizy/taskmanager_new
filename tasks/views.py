from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters import FilterSet, BooleanFilter

from tasks.models import Task
from tasks.serializers import TaskSerializer


class TaskFilterSet(FilterSet):
    class Meta:
        model = Task
        fields = ('done',)

    done = BooleanFilter(lookup_expr='__isnull')


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
