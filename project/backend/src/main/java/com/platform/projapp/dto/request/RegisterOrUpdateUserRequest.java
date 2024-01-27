package com.platform.projapp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.platform.projapp.model.AccessRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Dictionary;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterOrUpdateUserRequest {
    @NotBlank(message = "Поле email обязательно для заполнения")
    private String email;
    @NotBlank(message = "Поле email обязательно для заполнения")
    private String name;
    @NotBlank(message = "Поле password обязательно для заполнения")
    @Size(min = 6, message = "Поле password должно содержать не менее {min}")
    private String password;
    @NotBlank(message = "Поле phone обязательно для заполнения")
    private String phoneNumber;
    @JsonIgnore
    private final AccessRole role = AccessRole.ROLE_CLIENT;
    // @Size(min = 6, message = "Поле newPassword должно содержать не менее {min}")
    private String newPassword; //only for update

    public RegisterOrUpdateUserRequest(RegisterOrUpdateClubRequest registerClubRequest) {
        this.email = registerClubRequest.getEmail();
        this.name = registerClubRequest.getTitle();
        this.password = registerClubRequest.getPassword();
        this.phoneNumber = registerClubRequest.getPhoneNumber();
    }
}
