public with sharing class CertificateProgressController {
    @AuraEnabled(cacheable=true)
    public static List<CertificateProgress__c> getCertificateProgress() {
        return [
            SELECT Id, Certificate_name__c, Is_Completed__c
            FROM CertificateProgress__c
        ];
    }

    @AuraEnabled
    public static void saveCertificateProgress(List<CertificateProgress__c> progressList) {
        upsert progressList;  // Using upsert with the default Salesforce behavior, which uses 'Id'
    }
}
