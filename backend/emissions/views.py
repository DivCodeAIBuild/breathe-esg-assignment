from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.http import JsonResponse

import csv

from .models import (
    EmissionRecord,
    Organization,
    DataSource
)

from .serializers import EmissionRecordSerializer


@api_view(['GET'])
def get_emissions(request):

    emissions = EmissionRecord.objects.all()

    serializer = EmissionRecordSerializer(
        emissions,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
def upload_sap_csv(request):

    csv_file = request.FILES.get('file')

    if not csv_file:

        return JsonResponse({
            'error': 'No file uploaded'
        })

    decoded_file = csv_file.read().decode(
        'utf-8'
    ).splitlines()

    reader = csv.DictReader(decoded_file)

    organization = Organization.objects.first()

    source = DataSource.objects.filter(
        source_type='SAP'
    ).first()

    for row in reader:

        EmissionRecord.objects.create(

            organization=organization,

            source=source,

            category=row['category'],

            raw_value=float(row['raw_value']),

            raw_unit=row['raw_unit'],

            normalized_value=float(
                row['raw_value']
            ),

            normalized_unit=row['raw_unit'],
        )

    return JsonResponse({
        'message': 'SAP CSV uploaded successfully'
    })


@api_view(['POST'])
def upload_utility_csv(request):

    csv_file = request.FILES.get('file')

    if not csv_file:

        return JsonResponse({
            'error': 'No file uploaded'
        })

    decoded_file = csv_file.read().decode(
        'utf-8'
    ).splitlines()

    reader = csv.DictReader(decoded_file)

    organization = Organization.objects.first()

    source = DataSource.objects.filter(
        source_type='UTILITY'
    ).first()

    for row in reader:

        EmissionRecord.objects.create(

            organization=organization,

            source=source,

            category=row['category'],

            raw_value=float(row['raw_value']),

            raw_unit=row['raw_unit'],

            normalized_value=float(
                row['raw_value']
            ),

            normalized_unit=row['raw_unit'],
        )

    return JsonResponse({
        'message': 'Utility CSV uploaded successfully'
    })


@api_view(['POST'])
def upload_travel_csv(request):

    csv_file = request.FILES.get('file')

    if not csv_file:

        return JsonResponse({
            'error': 'No file uploaded'
        })

    decoded_file = csv_file.read().decode(
        'utf-8'
    ).splitlines()

    reader = csv.DictReader(decoded_file)

    organization = Organization.objects.first()

    source = DataSource.objects.filter(
        source_type='TRAVEL'
    ).first()

    for row in reader:

        EmissionRecord.objects.create(

            organization=organization,

            source=source,

            category=row['category'],

            raw_value=float(row['raw_value']),

            raw_unit=row['raw_unit'],

            normalized_value=float(
                row['raw_value']
            ),

            normalized_unit=row['raw_unit'],
        )

    return JsonResponse({
        'message': 'Travel CSV uploaded successfully'
    })


@api_view(['POST'])
def update_status(request, id):

    try:

        emission = EmissionRecord.objects.get(
            id=id
        )

        status = request.data.get('status')

        emission.status = status

        emission.save()

        return Response({
            'message': 'Status updated'
        })

    except Exception as e:

        return Response({
            'error': str(e)
        })