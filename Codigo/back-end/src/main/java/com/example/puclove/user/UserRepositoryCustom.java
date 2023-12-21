package com.example.puclove.user;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositoryCustom {

    void addInteraction (String userId, Interaction interaction);

    void addMatch (String userId, Match match);

}
