public with sharing class InternListSelector {
    /**
     * Fetches a list of Intern List records with related Intern Name and Training Program Name.
     * @return List of Intern_List__c with fields Intern__c, Intern__r.Name, and Training_Program__r.Name
     */
    @AuraEnabled(cacheable=true)
    public static List<Intern_List__c> fetchInternListRecords() {
        try {
            // Querying Intern_List__c with the required fields
            return [
                SELECT Intern__c, Intern__r.Name, Training_Program__c, Training_Program__r.Name 
                FROM Intern_List__c
            ];
        } catch (Exception e) {
            // Logging and throwing an error to the client
            System.debug('Error fetching Intern List records: ' + e.getMessage());
            throw new AuraHandledException('Unable to fetch Intern List records. Please contact your admin.');
        }
    }
}
