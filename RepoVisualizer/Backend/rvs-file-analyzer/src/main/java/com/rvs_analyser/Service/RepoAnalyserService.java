package Service;

import Utility.GitHubRepoParser;
import Model.RepoAnalysisResponse;
import Model.RepoAnalysisRequest;
import org.springframework.stereotype.Service;

@Service
public class RepoAnalyserService {
           public RepoAnalysisResponse analyseRepository(RepoAnalysisRequest request){
               return GitHubRepoParser.analyseRepo(request.getOwner(), request.getRepository());
           }

}
