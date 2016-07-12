from rest_framework import serializers

from todolist.backend.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('title', 'completed', 'id')