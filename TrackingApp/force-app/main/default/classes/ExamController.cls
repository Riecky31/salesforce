public with sharing class ExamController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getExamFields(Id recordId) {
        Exam__c exam = [SELECT Id, Name, Exam__c, Venue__c, Exam_Date__c, Exam_Status__c, Intern__r.Name,Results__c 
                        FROM Exam__c WHERE Id = :recordId LIMIT 1];
        
        // Prepare picklist options
        List<String> examPicklist = getPicklistValues('Exam__c', 'Exam__c');
        List<String> venuePicklist = getPicklistValues('Exam__c', 'Venue__c');

        return new Map<String, Object>{
            'examOptions' => examPicklist,
            'venueOptions' => venuePicklist,
            'status' => exam.Exam_Status__c,
            'internName' => exam.Intern__r.Name
        };
    }

    private static List<String> getPicklistValues(String objectName, String fieldName) {
        Schema.DescribeFieldResult fieldResult = Schema.getGlobalDescribe()
            .get(objectName)
            .getDescribe()
            .fields.getMap()
            .get(fieldName)
            .getDescribe();
        List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();

        List<String> values = new List<String>();
        for (Schema.PicklistEntry entry : picklistEntries) {
            values.add(entry.getLabel());
        }
        return values;
    }
}
