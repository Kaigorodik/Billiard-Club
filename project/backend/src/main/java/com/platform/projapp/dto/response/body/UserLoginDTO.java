package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.AccessRole;
import com.platform.projapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class UserLoginDTO {
    private String name;
    private String email;
    private Role role;

    public UserLoginDTO(User user) {
        this.email = user.getEmail();
        name = user.getName();
        role = user.getRole() == AccessRole.ROLE_BUSINESS ? Role.CLUB : Role.CLIENT;
    }
}
