package com.example.puclove.user;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public UserRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void addInteraction(String userId, Interaction interaction) {
        mongoTemplate.updateFirst(
                query(where("_id").is(userId)),
                new Update().push("interactions", interaction),
                User.class
        );
    }

    @Override
    public void addMatch(String userId, Match match) {
        mongoTemplate.updateFirst(
                query(where("_id").is(userId)),
                new Update().push("matches", match),
                User.class
        );
    }

}
