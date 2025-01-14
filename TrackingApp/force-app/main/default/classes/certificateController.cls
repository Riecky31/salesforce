public with sharing class CertificateController {
    @AuraEnabled(cacheable=true)
    public static List<Intern_certificates__c> getCertificates() {
        // Check if the user has Read access to the object
        if (!Schema.sObjectType.Intern_certificates__c.isAccessible()) {
            throw new AuraHandledException('You do not have access to view certificates.');
        }
        
        try {
            // Query the Intern_certificates__c object
            return [SELECT Id, Name, Date_issued__c, Intern__c FROM Intern_certificates__c];
        } catch (Exception e) {
            System.debug('Error retrieving certificates: ' + e.getMessage());
            throw new AuraHandledException('Unable to retrieve certificates at this time.');
        }
    }
}
