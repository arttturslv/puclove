package com.example.puclove.user;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String>, UserRepositoryCustom {

    Optional<User> findUserById(String id);

    Optional<User> findUserByEmail(String email);

    @Query("{'interests':?0}")
    List<User> findUsersByInterest(ObjectId interestId);

    @Query("{name:'?0'}")
    Optional<User> findUserByUsername(String name);

    @Query("{email:'?0'}")
    UserDetails findByLogin(String login);

    @Query("{" +
            "'_id': { '$ne': ?0 }," +
            "'interests': { '$elemMatch': { '$in': ?1 } }," +
            "'interactions.userId': { '$ne': ?0 }" +
            "}")
    List<User> findPotentialMatches(String userId, List<ObjectId> interestIds);

}
