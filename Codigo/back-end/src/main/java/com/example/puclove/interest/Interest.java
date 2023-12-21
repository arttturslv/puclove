package com.example.puclove.interest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "interests")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Interest {

    @Id
    private ObjectId id;
    private String interest;

    public Interest(String name) {
        this.interest = name;
    }

    // Getters and setters for the 'name' property
    public String getName() {
        return interest;
    }

    public void setName(String name) {
        this.interest = name;
    }

}
