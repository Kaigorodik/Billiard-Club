package com.platform.projapp.service;

import com.platform.projapp.configuration.jwt.JwtHelper;
import com.platform.projapp.configuration.jwt.JwtTokenFilter;
import com.platform.projapp.dto.request.RegisterOrUpdateUserRequest;
import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.CurrentUserProfileResponseBody;
import com.platform.projapp.dto.response.body.CurrentUserResponseBody;
import com.platform.projapp.dto.response.body.MessageResponseBody;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.model.AccessRole;
import com.platform.projapp.model.User;
import com.platform.projapp.repository.UserRepository;
import com.platform.projapp.service.mappers.UserMapper;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtHelper jwtHelper;
    private final JwtTokenFilter jwtTokenFilter;
    private final UserMapper userMapper;

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByUserName(String username) {
        return userRepository.findByEmail(username);
    }

    public void addUser(RegisterOrUpdateUserRequest registerRequest, AccessRole role) {
        if (registerRequest.getPassword() != null) {
            var user = userMapper.dtoToEntity(registerRequest);
            user.setPasswordHash(passwordEncoder.encode(registerRequest.getPassword()));
            user.setRole(role);
            userRepository.save(user);
        }
    }

    public User findByJwt(String jwt) {
        return findByUserName(jwtHelper.getUserNameFromJwtToken(jwt));
    }

    public User parseAndFindByJwt(String jwt) {
        return findByJwt(JwtHelper.parseJwt(jwt));
    }

    public GeneralResponse<CurrentUserResponseBody> getCurrentUser(HttpServletRequest req) {
        GeneralResponse<CurrentUserResponseBody> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseRequestJwt(req);
            String login = jwtHelper.getUserNameFromJwtToken(token);
            User user = userRepository.findByEmail(login);
            return response.withData(userMapper.userToDto(user));
        } catch (ExpiredJwtException e) {
            return response.withError("Срок использования токена истек");
        } catch (UsernameNotFoundException e) {
            return response.withError("Username not found: Пользователь не найден");
        }
    }

    public GeneralResponse<CurrentUserProfileResponseBody> getCurrentUserProfile(HttpServletRequest req) {
        GeneralResponse<CurrentUserProfileResponseBody> response = new GeneralResponse<>();
        try {
            String token = jwtTokenFilter.parseRequestJwt(req);
            if (token == null || token.isEmpty()) {
                return response.withError("Jwt is not provided");
            }
            String login = jwtHelper.getUserNameFromJwtToken(token);
            User user = userRepository.findByEmail(login);
            return response.withData(userMapper.userToProfileDto(user));
        } catch (ExpiredJwtException e) {
            return response.withError("Срок использования токена истек");
        } catch (UsernameNotFoundException e) {
            return response.withError("Username not found: Пользователь не найден");
        }
    }

    public GeneralResponse<MessageResponseBody> changeUserProfile(RegisterOrUpdateUserRequest req, HttpServletRequest request) {
        GeneralResponse<MessageResponseBody> response = new GeneralResponse<>();
        String token = jwtTokenFilter.parseRequestJwt(request);
        String login = jwtHelper.getUserNameFromJwtToken(token);
        User user = userRepository.findByEmail(login);
//        User user = userRepository.findByLogin(login).orElseThrow(() -> new UsernameNotFoundException(""));
        if (user == null) {
            return response.withError("Username not found: Пользователь не найден");
        }
        user.setName(req.getName());
//        user.setLogin(req.getLogin());
        user.setEmail(req.getEmail());

        if (req.getPassword() != null && req.getNewPassword() != null && !passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            return response.withError(ErrorConstants.USERNAME_OR_PASSWORD_NOT_FOUND);
        } else if (req.getPassword() == null && req.getNewPassword() != null)
            return response.withError(ErrorConstants.PASSWORD_IS_EMPTY);
        else if (req.getNewPassword() != null && passwordEncoder.matches(req.getPassword(), user.getPasswordHash()))
            user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
        return response.withData(MessageResponseBody.of("Информация о пользователе обновлена"));
    }
}
