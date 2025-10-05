package Utility;

import Model.RepoAnalysisResponse;

import java.util.HashMap;
import java.util.Map;

public class GitHubRepoParser {

    public static RepoAnalysisResponse analyseRepo(String owner, String repo) {
        // Simulate the analysis
        RepoAnalysisResponse response = new RepoAnalysisResponse();
        response.setOwner(owner);
        response.setRepoName(repo);

        // For example, simulate some data:
        response.setTotalFiles(42);

        Map<String, Integer> languages = new HashMap<>();
        languages.put("Java", 3000);
        languages.put("JavaScript", 1200);
        languages.put("HTML", 500);

        response.setLanguagesUsed(languages);

        return response;
    }
}
