package com.example.puclove.interest;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterestService {
    @Autowired
    private InterestRepository interestRepository;

    public List<Interest> allInterests() {
        return interestRepository.findAll();
    }

    public Optional<Interest> singleInterestById(ObjectId id){
        return interestRepository.findInterestById(id);
    }

}
