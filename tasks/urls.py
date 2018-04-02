from rest_framework.routers import DefaultRouter

from tasks.views import TaskViewSet

router = DefaultRouter(trailing_slash=False)
router.register('tasks', TaskViewSet, 'tasks')
urlpatterns = router.urls