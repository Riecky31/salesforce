public with sharing class InternListController {
    @AuraEnabled(cacheable=true)
    public static List<Intern_List__c> getInternsByTrainingProgram(Id trainingProgramId) {
        return [
            SELECT Id, Intern__c, Intern__r.Name
            FROM Intern_List__c 
            WHERE Training_Program__c = :trainingProgramId
        ];
    }
}
