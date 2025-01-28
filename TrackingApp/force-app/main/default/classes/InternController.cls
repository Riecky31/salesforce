public with sharing class InternController {
    @AuraEnabled(cacheable=true)
    public static List<User> getInterns() {
        try {
            return [
                SELECT Id, Name 
                FROM User 
                WHERE IsActive = true 
                ORDER BY Name 
                LIMIT 100
            ];
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching interns: ' + e.getMessage());
        }
    }
}