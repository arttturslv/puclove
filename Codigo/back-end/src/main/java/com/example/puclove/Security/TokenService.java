package com.example.puclove.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.puclove.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

/**
 * Esta classe é responsável por gerar e validar tokens de autenticação JWT (JSON Web Token).
 */
@Service
public class TokenService {

    @Value("${api.token.secretKey}")
    private String secretKey;

    /**
     * Gera um token JWT para um usuário.
     *
     * @param user O usuário para o qual o token será gerado.
     * @return O token JWT gerado.
     * @throws RuntimeException Exceção lançada em caso de erros na geração do token.
     */
    public String generateToken(User user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            return JWT.create()
                    .withIssuer("puclove-auth-api")
                    .withSubject(user.getEmail())
                    .withExpiresAt(LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00")))
                    .sign(algorithm);
        } catch (JWTCreationException e){
            throw new RuntimeException("Erro na geração do token", e);
        }
    }

    /**
     * Valida um token JWT e retorna o email associado a ele.
     *
     * @param token O token JWT a ser validado.
     * @return O email associado ao token, ou uma string vazia se a validação falhar.
     */
    public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            return JWT.require(algorithm)
                    .withIssuer("puclove-auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception){
            return "";
        }
    }
}
