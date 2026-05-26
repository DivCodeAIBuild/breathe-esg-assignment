from django.urls import path

from .views import (
    get_emissions,
    upload_sap_csv,
    upload_utility_csv,
    upload_travel_csv,
    update_status
)

urlpatterns = [

    path(
        'emissions/',
        get_emissions
    ),

    path(
        'upload-sap-csv/',
        upload_sap_csv
    ),

    path(
        'upload-utility-csv/',
        upload_utility_csv
    ),

    path(
        'upload-travel-csv/',
        upload_travel_csv
    ),

    path(
        'update-status/<int:id>/',
        update_status
    ),

]