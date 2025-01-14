public with sharing class CertificateController {
    @AuraEnabled(cacheable=true)
    public static Map<Id, List<Intern_certificates__c>> getCertificates() {
        try {
            // Fetch certificates and include the related intern and Date_Issued__c field
            List<Intern_certificates__c> certificates = [
                SELECT Id, Name, Date_issued__c, Intern__r.Name 
                FROM Intern_certificates__c
            ];
            
            // Group certificates by Intern__c (Intern's Id)
            Map<Id, List<Intern_certificates__c>> groupedCertificates = new Map<Id, List<Intern_certificates__c>>();
            
            for (Intern_certificates__c certificate : certificates) {
                if (certificate.Intern__c != null) { // Ensure intern is not null
                    if (!groupedCertificates.containsKey(certificate.Intern__c)) {
                        groupedCertificates.put(certificate.Intern__c, new List<Intern_certificates__c>());
                    }
                    groupedCertificates.get(certificate.Intern__c).add(certificate);
                }
            }
            
            return groupedCertificates;
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching certificates: ' + e.getMessage());
        }
    }
}
