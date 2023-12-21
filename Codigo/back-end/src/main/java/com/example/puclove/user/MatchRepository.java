package com.example.puclove.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends MongoRepository<Match, String> {
    Match findByUserIdAndOtherUserId(String userId, String otherUserId);

}
