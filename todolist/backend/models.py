from django.db import models
from django.contrib import admin


#create the class which will be description your to-do list
class Task(models.Model):

    #title of the task
    title = models.CharField(max_length=200)

    #is the job finished?
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']


class CompletedTasks(models.Model):

    #counts how many task is completed
	is_done = models.PositiveIntegerField(default=0)


admin.site.register(Task)
admin.site.register(CompletedTasks)
