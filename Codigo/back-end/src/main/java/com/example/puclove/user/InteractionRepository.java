package com.example.puclove.user;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InteractionRepository extends MongoRepository<Interaction, String> {
    Optional<Interaction> findByUserIdAndTargetUserId(String userId, String targetUserId);

}
