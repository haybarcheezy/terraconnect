from rest_framework import viewsets, status
from .models import Land
from .serializers import LandSerializer, BulkUploadSerializer
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
import csv
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.pagination import PageNumberPagination


class LandViewSet(viewsets.ModelViewSet):
    serializer_class = LandSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Land.objects.all()
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = Land.objects.filter(user=self.request.user)

        # Get the requested fields from the query parameters
        requested_fields = self.request.query_params.getlist('fields', [])

        # Convert field names to lowercase for case-insensitive matching
        lowercase_field_names = [field.lower() for field in requested_fields]

        if lowercase_field_names:
            # Filter the queryset based on the lowercase field names
            queryset = queryset.values(*lowercase_field_names)

        sort_by = self.request.query_params.get('sort')

        if sort_by == 'reverse':
            # Reverse the queryset based on ID
            queryset = queryset.order_by('-id')

        return queryset

    def list(self, request, *args, **kwargs):
        # Handle pagination
        page = self.request.query_params.get('page')
        limit = self.request.query_params.get('limit')

        if page and limit:
            self.pagination_class.page_size = int(limit)
        else:
            self.pagination_class = None

        try:
            queryset = self.filter_queryset(self.get_queryset())

            if self.pagination_class is not None:
                page = self.paginate_queryset(queryset)
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            else:
                serializer = self.get_serializer(queryset, many=True)
                data = serializer.data
                return Response({'count': len(data), 'results': data})

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if 'name' in request.data:
            instance.name = request.data.get('name')

        if 'address' in request.data:
            instance.address = request.data.get('address')

        if 'acreage' in request.data:
            instance.acreage = request.data.get('acreage')

        if 'image' in request.data:
            instance.image = request.data['image']

        if 'extra_fields' in request.data:
            extra_fields = request.data.get('extra_fields', [])
            extra_fields = [
                {'label': field['label'], 'value': field['value']}
                for field in extra_fields
            ]
            instance.extra_fields = extra_fields

        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)


@method_decorator(csrf_exempt, name='dispatch')
class BulkUploadView(APIView):
    serializer_class = BulkUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        csv_file = serializer.validated_data['file']

        try:
            decoded_file = csv_file.read().decode('utf-8').splitlines()
            reader = csv.DictReader(decoded_file)
            properties = []
            extra_fields = [field for field in reader.fieldnames if field not in ['name', 'acreage', 'address']]
            for row in reader:
                property_data = {
                    'name': row.get('name', ''),
                    'acreage': row.get('acreage', ''),
                    'address': row.get('address', ''),
                    'extra_fields': [
                        {'label': field, 'value': row[field]} for field in extra_fields
                    ],
                }
                properties.append(property_data)

            serializer = LandSerializer(data=properties, many=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)

            return Response(serializer.data, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=400)
