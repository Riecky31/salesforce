@RestResource(urlMapping='/trainingProgram/*')
global with sharing class TrainingProgramController {

    // Endpoint to fetch training program data by ID
    @AuraEnabled(cacheable=true)
    @HttpGet
    global static TrainingProgram__c getTrainingProgramData() {
        RestRequest req = RestContext.request;
        String trainingProgramId = req.requestURI.substring(req.requestURI.lastIndexOf('/') + 1);

        // Fetch the training program with its details
        TrainingProgram__c trainingProgram = [
            SELECT Id, Name, start_date__c, End_date__c, Duration__c, Status__c, Certificates__c
            FROM TrainingProgram__c
            WHERE Id = :trainingProgramId
            LIMIT 1
        ];
        return trainingProgram;
    }

    // Endpoint to assign interns to the training program
    @AuraEnabled
    @HttpPatch
    global static String assignInternToTrainingProgram(String trainingProgramId, List<Id> internIds) {
        try {
            // Fetch the Training Program record
            List<TrainingProgram__c> trainingPrograms = [
                SELECT Id,  FROM TrainingProgram__c WHERE Id = :trainingProgramId
            ];
            TrainingProgram__c tp = trainingPrograms[0];
            
          
            update tp;
            
            return 'Interns assigned successfully';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
}
