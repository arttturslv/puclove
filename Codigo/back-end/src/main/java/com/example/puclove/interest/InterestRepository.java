package com.example.puclove.interest;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterestRepository extends MongoRepository<Interest, ObjectId> {

    Optional<Interest> findInterestById(ObjectId id);

    Optional<Interest> findByInterest(String interest);

}
