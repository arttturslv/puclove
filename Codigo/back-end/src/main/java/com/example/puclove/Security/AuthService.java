package com.example.puclove.Security;

import com.example.puclove.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Esta classe é responsável por fornecer detalhes do usuário para fins de autenticação.
 * Ela implementa a interface UserDetailsService.
 */
@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    /**
     * Carrega os detalhes do usuário com base no nome de usuário (username) fornecido.
     *
     * @param username O nome de usuário (username) para carregar os detalhes do usuário.
     * @return UserDetails contendo os detalhes do usuário, ou lança uma exceção UsernameNotFoundException
     *         se o usuário não for encontrado.
     * @throws UsernameNotFoundException Exceção lançada quando o usuário não é encontrado.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByLogin(username);
    }
}
