from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LandViewSet, BulkUploadView

router = DefaultRouter()
router.register(r'', LandViewSet, basename='land')

urlpatterns = [
    path('bulk_upload/', BulkUploadView.as_view(), name='bulk_upload'),
    path('', include(router.urls)),
]
