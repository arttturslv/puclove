package com.example.puclove.filedata;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "files")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FileData {
    @Id
    @MongoId
    private ObjectId id;
    private String name;
    private String type;
    private String filePath;
}
