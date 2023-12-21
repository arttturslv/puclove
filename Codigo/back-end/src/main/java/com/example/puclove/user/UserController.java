package com.example.puclove.user;


import com.example.puclove.Security.LoginDataDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.allUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<User>> getUserByUserId(@PathVariable String userId) {
        Optional<User> user = userService.findUserById(userId);

        if (user.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/matchingUsers")
    public ResponseEntity<Optional<List<User>>> getUserPotentialMatches(@AuthenticationPrincipal User user) {
        Optional<List<User>> users = userService.findPotentialMatches(user);

        if (users.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<LoginDataDTO> updateUserData(@PathVariable String id, @RequestBody @Validated LoginDataDTO loginDataDTO){

        User existingUser = userService.findUserById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if(loginDataDTO.getAboutUser() != null
                && !loginDataDTO.getAboutUser().getDescription().isEmpty()
                && !loginDataDTO.getAboutUser().getGender().isEmpty()
                && !loginDataDTO.getAboutUser().getOrientation().isEmpty()) {
            ProfileSong userProfileSong = new ProfileSong();
            BeanUtils.copyProperties(loginDataDTO.getAboutUser().getProfileSong(), userProfileSong);

            AboutUser aboutUser = new AboutUser();
            BeanUtils.copyProperties(loginDataDTO.getAboutUser(), aboutUser);

            aboutUser.setProfileSong(userProfileSong);
            existingUser.setAboutUser(aboutUser);
        }

        userService.updateUserDataFromDTO(existingUser, loginDataDTO);

        User updatedUser = userService.save(existingUser);

        LoginDataDTO updatedLoginDataDTO = LoginDataDTO.fromUser(updatedUser);

        return ResponseEntity.ok(updatedLoginDataDTO);
    }

    /**
     * Endpoint para requisições de curtir um usuário. Espera um corpo de requisição JSON contendo o id do usuário a ser curtido.
     * Retorna um objeto MatchResponse contendo uma mensagem e um objeto Match, caso haja um match.
     * @param user
     * @param userId
     * @return
     */
    @PostMapping("/like/{userId}")
    public ResponseEntity<?> likeUser(@AuthenticationPrincipal User user, @PathVariable String userId) {
        boolean isAMatch = userService.likeUser(user, userId);

        if (isAMatch) {
            Match match = userService.getMatch(user.getId(), userId);
            return ResponseEntity.ok(new MatchResponse("It's a match!", match));
        } else
            return ResponseEntity.ok(new MatchResponse("Liked!", null));

    }

}
