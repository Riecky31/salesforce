from django.urls import path
from .views import SalesforceAccountList

urlpatterns = [
    path('salesforce/contacts/', SalesforceAccountList.as_view(), name='salesforce-contacts'),
]
