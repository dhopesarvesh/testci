package Controller;


import Model.RepoAnalysisRequest;
import Model.RepoAnalysisResponse;
import Service.RepoAnalyserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/repo")
public class RepoAnalyzerController {

    @Autowired
    private RepoAnalyserService repoAnalyserService;

    @PostMapping("/analyse")
    public RepoAnalysisResponse analysisResponse(@RequestBody RepoAnalysisRequest request){
        return repoAnalyserService.analyseRepository(request);
    }
}
