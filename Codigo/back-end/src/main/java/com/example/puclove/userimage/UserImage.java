package com.example.puclove.userimage;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "userImages")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserImage {

    @Id
    @MongoId
    private String id;
    private ObjectId userId;
    @Getter
    private String imagePath;

}
