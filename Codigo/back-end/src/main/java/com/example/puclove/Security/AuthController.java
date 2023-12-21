package com.example.puclove.Security;

import com.example.puclove.interest.Interest;
import com.example.puclove.interest.InterestRepository;
import com.example.puclove.user.AuthenticationDTO;
import com.example.puclove.user.RegisterDTO;
import com.example.puclove.user.User;
import com.example.puclove.user.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Esta classe representa os endpoints da API REST relacionados à autenticação e registro de usuários.
 * Todos os endpoints estão mapeados sob o caminho base "/auth".
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InterestRepository interestRepository;

    @Autowired
    private TokenService tokenService;

    /**
     * Endpoint para login de usuário. Espera um corpo de requisição JSON contendo credenciais de login.
     *
     * @param authenticationDTO Um AuthenticationDTO validado contendo login e senha.
     * @return ResponseEntity com um map contendo um token JWT se a autenticação for bem-sucedida e um JSON com os dados do usuário.
     */
    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public ResponseEntity<?> login(@RequestBody @Validated AuthenticationDTO authenticationDTO){
        var usernamePassword = new UsernamePasswordAuthenticationToken(authenticationDTO.login(), authenticationDTO.password());

        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        var user = userRepository
                .findUserByEmail(authenticationDTO.login())
                .orElseThrow(() -> new RuntimeException("user not found"));

        var loginData = LoginDataDTO.fromUser(user);

        return ResponseEntity.ok(Map.of("token", token,
                                        "user", loginData));
    }

    /**
     * Endpoint para registro de usuário. Espera um corpo de requisição JSON com campos do RegisterDTO.
     *
     * @param registerDTO Um RegisterDTO validado contendo dados de registro do usuário.
     * @return ResponseEntity indicando o sucesso ou falha do processo de registro.
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Validated RegisterDTO registerDTO){
        if(this.userRepository.findByLogin(registerDTO.email()) != null) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(registerDTO.password());
        User newUser = User.builder()
                .name(registerDTO.name())
                .email(registerDTO.email())
                .password(encryptedPassword)
                .birthDate(registerDTO.birthDate())
                .course(registerDTO.course())
                .campus(registerDTO.campus())
                .instagram(registerDTO.instagram())
                .phoneNumber(registerDTO.phoneNumber())
                .intention(registerDTO.intention())
                .role(registerDTO.role())
                .build();

        for (Interest interest : registerDTO.interests()) {
            var optionalUserInterest = interestRepository.findByInterest(interest.getInterest());

            if (optionalUserInterest.isPresent()) {
                Interest userInterest = optionalUserInterest.get();
                newUser.addInterest(userInterest);
            } else {
                throw new RuntimeException("interest not found");
            }
        }

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}

