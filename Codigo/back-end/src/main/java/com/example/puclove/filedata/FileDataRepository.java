package com.example.puclove.filedata;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FileDataRepository extends MongoRepository<FileData, ObjectId> {

    Optional<FileData> findByName(String fileName);

}
