# salesforce_app/salesforce_integration.py
from simple_salesforce import Salesforce
from simple_salesforce.exceptions import SalesforceAuthenticationFailed
import os

# Your Salesforce credentials
CLIENT_ID = '3MVG9PwZx9R6_Urf5Vm3QTz2Ns2thoSOitxVikXR66eAf6sRAyiFDjUbkMVjMeBDfqSaI9B.C9U7cilyWFws7'  # Replace with your Salesforce Consumer Key
CLIENT_SECRET = 'B6C41677F70DB1B14B0874C8D41C49F5BF9F6767D2397A39A690F7523C2FAC87'  # Replace with your Salesforce Consumer Secret
USER = 'matimumyrieck@gmail.com'  # Your Salesforce username
PASSWORD = 'Riecky31@'  # Your Salesforce password
SECURITY_TOKEN = 'noYgpD47leH4F41vYrvyMcai'  # Your Salesforce security token

def get_salesforce_connection():
    # Make sure you have these variables defined somewhere in your code
    sf = Salesforce(username=USER, password=PASSWORD, security_token=SECURITY_TOKEN)
    return sf
