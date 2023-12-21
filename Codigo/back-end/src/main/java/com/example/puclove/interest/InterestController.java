package com.example.puclove.interest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/v1/interests")
public class InterestController {
    @Autowired
    private InterestService interestService;

    @GetMapping
    public ResponseEntity<List<Interest>> getAllInterests() {
        List<Interest> interests = interestService.allInterests();
        return new ResponseEntity<>(interests, HttpStatus.OK);
    }
}
