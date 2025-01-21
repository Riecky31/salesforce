public with sharing class ExamDataController {
    @AuraEnabled(cacheable=true)
    public static List<InternExamWrapper> getExamRecordsGroupedByIntern() {
        // Map to group exams by intern
        Map<Id, List<Exam__c>> internExamMap = new Map<Id, List<Exam__c>>();
        
        // Fetch exam records
        List<Exam__c> exams = [
            SELECT Id, Name, Score__c, Exam_Status__c, Exam_Date__c, Exam__c, Venue__c, Results__c, Intern__c, Intern__r.Name
            FROM Exam__c
            ORDER BY Intern__r.Name, Exam_Date__c
        ];

        // Group exams by Intern__c
        for (Exam__c exam : exams) {
            if (!internExamMap.containsKey(exam.Intern__c)) {
                internExamMap.put(exam.Intern__c, new List<Exam__c>());
            }
            internExamMap.get(exam.Intern__c).add(exam);
        }

        // Create a wrapper list to return grouped data
        List<InternExamWrapper> result = new List<InternExamWrapper>();
        for (Id internId : internExamMap.keySet()) {
            result.add(new InternExamWrapper(internId, internExamMap.get(internId)));
        }
        return result;
    }

    // Wrapper class to return intern details with their exams
    public class InternExamWrapper {
        @AuraEnabled public String internName;
        @AuraEnabled public List<Exam__c> exams;

        public InternExamWrapper(Id internId, List<Exam__c> exams) {
            this.internName = (exams.size() > 0 && exams[0].Intern__r != null) ? exams[0].Intern__r.Name : 'Unknown Intern';
            this.exams = exams;
        }
    }
}
