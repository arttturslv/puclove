package com.example.puclove.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileSong {

    @Id
    @MongoId
    private String id;
    private String songTitle;
    private String author;
    private String songImgUrl;
    private String songUrl;

}
