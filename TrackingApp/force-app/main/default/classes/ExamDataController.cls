public with sharing class ExamDataController {
    @AuraEnabled(cacheable=true)
    public static List<Exam__c> getGroupedExamsByRecord(Id recordId) {
        if (recordId == null) {
            throw new AuraHandledException('Invalid recordId');
        }

        // Fetch only the exams related to the given Exam record
        return [
            SELECT Id, Name, Score__c, Exam_Status__c, Exam_Date__c, Venue__c, Results__c,
                   Intern__r.Id, Intern__r.Name
            FROM Exam__c
            WHERE Id = :recordId
            ORDER BY Exam_Date__c DESC
        ];
    }
}
