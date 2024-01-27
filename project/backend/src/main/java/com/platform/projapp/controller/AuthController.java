package com.platform.projapp.controller;

import com.platform.projapp.dto.request.*;
import com.platform.projapp.error.ErrorConstants;
import com.platform.projapp.service.AuthService;
import com.platform.projapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<?> authUser(@RequestBody AuthRequest authRequest) {
        var response = authService.authUser(authRequest.getLogin(), authRequest.getPassword());
        //return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(404).body(response);
        if (response.success()) return ResponseEntity.ok(response);
        else if (response.getMessage().equals(ErrorConstants.USERNAME_OR_PASSWORD_NOT_FOUND))
            return ResponseEntity.status(401).body(response);
        else return ResponseEntity.status(500).body(response);
    }

    @PostMapping("/signup/client")
    public ResponseEntity<?> registerUser(@RequestBody @Valid RegisterOrUpdateUserRequest registerRequest, BindingResult bindingResult) {
        var response = authService.registerUser(registerRequest, bindingResult);
        return response.success() ? ResponseEntity.ok(authService.authUser(registerRequest.getEmail(), registerRequest.getPassword())) : ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/signup/club")
    public ResponseEntity<?> registerClub(@RequestBody @Valid RegisterOrUpdateClubRequest registerRequest, BindingResult bindingResult) {
        var response = authService.registerClub(registerRequest, bindingResult);
        return response.success() ? ResponseEntity.ok(authService.authUser(registerRequest.getEmail(), registerRequest.getPassword())) : ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest token) {
        var response = authService.refreshToken(token);
        return response.success() ? ResponseEntity.ok(response) : ResponseEntity.status(404).body(response);
    }

}
