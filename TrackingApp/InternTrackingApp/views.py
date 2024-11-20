# salesforce_app/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .salesforce_intergration import get_salesforce_connection

class SalesforceAccountList(APIView):
    def get(self, request):
        # Get the Salesforce connection
        sf = get_salesforce_connection()
        
        if sf is None:
            return Response({"error": "Salesforce connection failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            # Fetch Account records from Salesforce
            accounts = sf.query_all("SELECT Id, Name FROM Account LIMIT 10")
            return Response(accounts['records'], status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
