public with sharing class certificateController {
    @AuraEnabled
    public static String createCertificate(String name, Date expirationDate, Datetime dateIssuedDateTime, Id internId) {
        try {
            Intern_certificates__c certificate = new Intern_certificates__c();
            certificate.Name = name;
            certificate.Expiration_Date__c = expirationDate;
            certificate.Date_issued__c = dateIssuedDateTime;
            certificate.Intern__c = internId; // Add the lookup to User
            insert certificate;
            return 'Success';
        } catch (Exception e) {
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }
}
