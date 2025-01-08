public with sharing class ExamController {
    @AuraEnabled(cacheable=true)
    public static Map<String, Object> getExamFields(Id recordId) {
        try {
            // Fetch the Exam record
            Exam__c exam = [
                SELECT Id, Name, Exam__c, Venue__c, Exam_Date__c, Exam_Status__c, Intern__r.Name, Results__c 
                FROM Exam__c 
                WHERE Id = :recordId 
                LIMIT 1
            ];
            
            // Get picklist values for Exam and Venue fields
            List<String> examPicklist = getPicklistValues('Exam__c', 'Exam__c');
            List<String> venuePicklist = getPicklistValues('Exam__c', 'Venue__c');
            
            // Prepare the response map
            Map<String, Object> responseMap = new Map<String, Object>();
            responseMap.put('examOptions', examPicklist);
            responseMap.put('venueOptions', venuePicklist);
            responseMap.put('status', exam.Exam_Status__c);
            responseMap.put('internName', exam.Intern__r != null ? exam.Intern__r.Name : null);
            return responseMap;
        } catch (Exception e) {
            // Handle unexpected errors
            throw new AuraHandledException('Error retrieving exam details: ' + e.getMessage());
        }
    }

    // Utility method to fetch picklist values for a specific object and field
    private static List<String> getPicklistValues(String objectName, String fieldName) {
        try {
            // Get field describe result
            Schema.DescribeFieldResult fieldResult = Schema.getGlobalDescribe()
                .get(objectName)
                .getDescribe()
                .fields.getMap()
                .get(fieldName)
                .getDescribe();
            
            // Extract picklist values
            List<String> values = new List<String>();
            for (Schema.PicklistEntry entry : fieldResult.getPicklistValues()) {
                values.add(entry.getLabel());
            }
            return values;
        } catch (Exception e) {
            // Handle errors in fetching picklist values
            throw new AuraHandledException('Error retrieving picklist values for ' + objectName + '.' + fieldName + ': ' + e.getMessage());
        }
    }
}
