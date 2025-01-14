public with sharing class InternController {
    @AuraEnabled(cacheable=true)
    public static List<InternList__c> getInternsByUser(Id userId) {
        // Ensure InternList__c exists and the API name is correct
        return [
            SELECT Id, Name, ID_Number__c, Last_Name__c, Phone_Number__c, Training_Program__r.Name, User_Profile__r.Name 
            FROM InternList__c
            WHERE User_Profile__c = :userId
        ];
    }

    @AuraEnabled
    public static void assignInternToUser(Id internId, Id userId) {
        InternList__c intern = [SELECT Id, User_Profile__c FROM InternList__c WHERE Id = :internId LIMIT 1];
        if (intern != null) {
            intern.User_Profile__c = userId;
            update intern;
        } else {
            throw new AuraHandledException('Intern not found');
        }
    }
}
