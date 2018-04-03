from django.db import models
from django.db.models import F
from django.db.transaction import atomic
from django.utils.functional import cached_property
from rest_framework.exceptions import ValidationError


class TaskQuerySet(models.QuerySet):
    def done(self):
        return self.filter(done__isnull=True)

    def undone(self):
        return self.filter(done__isnull=False)


def last_plus_1():
    last_task = Task.objects.order_by('-position').first()
    if not last_task:
        return 0
    return last_task.position + 1


class Task(models.Model):
    class Meta:
        ordering = ('-position',)
    text = models.TextField()
    done = models.DateTimeField(null=True, blank=True, default=None)
    position = models.IntegerField(default=last_plus_1)

    @cached_property
    def actual_state(self):
        if not self.pk:
            return None
        return type(self).objects.get(pk=self.pk)

    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        self._handle_position()
        super().save(force_insert, force_update, using, update_fields)

    def _validate_position(self):
        if self.position < 0 or self.position >= last_plus_1():
            raise ValidationError('Can\'t cross boundary positions')

    def _is_need_to_move(self):
        if (not self.actual_state or
                self.actual_state.position == self.position):
            return False
        return True

    def _update_other_positions(self):
        position = self.position or last_plus_1()
        to_update = Task.objects.filter(
            position__gte=min(self.actual_state.position, position),
            position__lte=max(self.actual_state.position, position),
        ).exclude(pk=self.pk)
        offset = 1 if self.actual_state.position > position else -1
        to_update.update(position=F('position') + offset)

    def _handle_position(self):
        if self._is_need_to_move():
            self._validate_position()
            self._update_other_positions()

    def delete(self, using=None, keep_parents=False):
        self.position = None
        self._update_other_positions()
        super().delete(using, keep_parents)
