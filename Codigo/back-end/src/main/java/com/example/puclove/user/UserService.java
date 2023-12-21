package com.example.puclove.user;

import com.example.puclove.Security.LoginDataDTO;
import com.example.puclove.interest.Interest;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InteractionRepository interactionRepository;
    @Autowired
    private MatchRepository matchRepository;

    /**
     * Busca todos os usuários
     * @return lista de usuários
     */
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    /**
     * Busca um usuário pelo username
     * @return usuário
     */
    public Optional<User> findUserByUsername(String name) { return userRepository.findUserByUsername(name);}

    public Optional<User> findUserByEmail(String email) { return userRepository.findUserByEmail(email);}

    public Optional<User> findUserById(String id) {
        return userRepository.findUserById(id);
    }

    public User save(User user) { return userRepository.save(user); }

    /**
     * Get de todos os usuários que tenham pelo menos um interesse em comum com o usuário atual
     */
    public Optional<List<User>> findPotentialMatches(User user) {
        List<Interest> currentUserInterests = user.getInterests();
        String thisUserId = user.getId();

        List<ObjectId> interestIds = currentUserInterests.stream()
                .map(Interest::getId)
                .toList();

        List<User> potentialMatches = userRepository.findPotentialMatches(thisUserId, interestIds);

        return Optional.of(potentialMatches);
    }

    /**
     * Adiciona um like ao usuário e verifica se houve um match entre os usuários, caso haja, adiciona um match para cada um.
     * @return
     */
    public boolean likeUser(User user, String targetUserId) {
        String userId = user.getId();
        Interaction interaction = new Interaction(userId, targetUserId, InteractionType.LIKE);

        user.addInteraction(interaction);
        userRepository.addInteraction(userId, interaction);
        interactionRepository.save(interaction);

        if (isAMatch(targetUserId, userId)) {
            User likedUser = userRepository.findUserById(targetUserId).get();

            Match match = new Match(userId, targetUserId);
            Match otherUserMatch = new Match(targetUserId, userId);

            user.addMatch(match);
            likedUser.addMatch(otherUserMatch);

            userRepository.addMatch(userId, match);
            userRepository.addMatch(targetUserId, otherUserMatch);

            matchRepository.save(match);
            return true;
        }

        return false;
    }

    public void updateUserDataFromDTO(User user, LoginDataDTO dto) {
        if (dto.getName() != null && !dto.getName().isEmpty()) {
            user.setName(dto.getName());
        }
        if (dto.getEmail() != null && !dto.getEmail().isEmpty()) {
            user.setEmail(dto.getEmail());
        }
        if (dto.getBirthDate() != null) {
            user.setBirthDate(dto.getBirthDate());
        }
        if (dto.getCourse() != null && !dto.getCourse().isEmpty()) {
            user.setCourse(dto.getCourse());
        }
        if (dto.getCampus() != null && !dto.getCampus().isEmpty()) {
            user.setCampus(dto.getCampus());
        }
        if (dto.getInterests() != null || !dto.getInterests().isEmpty()) {
            user.setInterests(dto.getInterests());
        } else {user.setInterests(user.getInterests());}
        if(dto.getMatches() != null && !dto.getMatches().isEmpty()){
            user.setMatches(user.getMatches());
        }
        if (dto.getInstagram() != null && !dto.getInstagram().isEmpty()) {
            user.setInstagram(dto.getInstagram());
        }
        if (dto.getPhoneNumber() != null && !dto.getPhoneNumber().isEmpty()) {
            user.setPhoneNumber(dto.getPhoneNumber());
        }
        if (dto.getIntention() != null) {
            user.setIntention(dto.getIntention());
        }
    }

    /**
     * Verifica se houve um match entre os usuários
     * @return
     */
    private boolean isAMatch(String targetUserId, String userId) {
        return interactionRepository.findByUserIdAndTargetUserId(targetUserId, userId).isPresent();
    }

    /**
     * Busca um match entre dois usuários
     * @return
     */
    public Match getMatch(String userId, String otherUserId) {
        return matchRepository.findByUserIdAndOtherUserId(userId, otherUserId);
    }

}
