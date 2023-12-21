package com.example.puclove.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "matches")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Match {
    @Id
    @MongoId
    private String id;
    private String userId;
    private String otherUserId;

    public Match(String userId, String otherUserId) {
        this.userId = userId;
        this.otherUserId = otherUserId;
    }

}
