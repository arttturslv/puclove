package com.example.puclove.Security;

import com.example.puclove.user.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Esta classe representa um filtro de segurança que verifica a presença e validade de tokens de autenticação em requisições HTTP.
 * O filtro é acionado uma vez para cada requisição.
 */
@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    /**
     * Implementa o comportamento do filtro para verificar e autenticar um token em uma requisição.
     *
     * @param request     O objeto HttpServletRequest da requisição.
     * @param response    O objeto HttpServletResponse da resposta.
     * @param filterChain O filtro seguinte na cadeia de filtros.
     * @throws ServletException Exceção lançada em caso de erros durante o processamento do filtro.
     * @throws IOException      Exceção lançada em caso de erros de E/S durante o processamento do filtro.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if(token != null){
            var login = tokenService.validateToken(token);
            UserDetails user = userRepository.findByLogin(login);

            var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        filterChain.doFilter(request, response);
    }

    /**
     * Recupera o token de autenticação de um cabeçalho de autorização HTTP.
     *
     * @param request O objeto HttpServletRequest da requisição.
     * @return O token de autenticação, ou null se não estiver presente.
     */
    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}

