package com.example.puclove.Security;

import com.example.puclove.interest.Interest;
import com.example.puclove.user.AboutUser;
import com.example.puclove.user.Intention;
import com.example.puclove.user.Match;
import com.example.puclove.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginDataDTO {

    //dados a serem salvos no session storage
    private String id;
    private String name;
    private String email;
    private LocalDate birthDate;
    private String course;
    private String campus;
    private List<Interest> interests;
    private List<Match> matches;
    private String instagram;
    private String phoneNumber;
    private AboutUser aboutUser;
    private Intention intention;

    //converte o user pra LoginDataDTO
    public static LoginDataDTO fromUser(User user) {
        return LoginDataDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .birthDate(user.getBirthDate())
                .course(user.getCourse())
                .campus(user.getCampus())
                .interests(user.getInterests())
                .matches(user.getMatches())
                .instagram(user.getInstagram())
                .phoneNumber(user.getPhoneNumber())
                .aboutUser(user.getAboutUser())
                .intention(user.getIntention())
                .build();
    }
}
