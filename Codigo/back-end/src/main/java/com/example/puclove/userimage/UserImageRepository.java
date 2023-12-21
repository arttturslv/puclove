package com.example.puclove.userimage;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserImageRepository extends MongoRepository<UserImage, ObjectId> {

    List<UserImage> findUserImageByUserId(ObjectId userId);
}
