from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('prova', views.ProvaViewSet, basename='prova')


urlpatterns = [
]

urlpatterns += router.urls