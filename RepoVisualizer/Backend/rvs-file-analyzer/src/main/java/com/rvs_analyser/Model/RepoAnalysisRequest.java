package Model;

import lombok.Data;

@Data
public class RepoAnalysisRequest {
    private String owner;
    private String repository;
}
