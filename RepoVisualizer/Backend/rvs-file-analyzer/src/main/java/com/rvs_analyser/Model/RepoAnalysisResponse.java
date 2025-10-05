package Model;

import lombok.Data;

import java.util.Map;
@Data
public class RepoAnalysisResponse {
    private String repoName;
    private String owner;
    private int totalFiles;
    private Map<String, Integer> LanguagesUsed;
}
