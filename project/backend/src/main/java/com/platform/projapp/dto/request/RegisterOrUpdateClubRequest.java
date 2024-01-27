package com.platform.projapp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.platform.projapp.model.AccessRole;
import com.platform.projapp.model.BilliardTypes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashMap;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterOrUpdateClubRequest {
    @NotBlank(message = "Поле email обязательно для заполнения")
    private String email;
    @NotBlank(message = "Поле password обязательно для заполнения")
    @Size(min = 6, message = "Поле password должно содержать не менее {min}")
    private String password;
    @NotBlank(message = "Поле phone обязательно для заполнения")
    private String phoneNumber;
    @JsonIgnore
    private final AccessRole role = AccessRole.ROLE_BUSINESS;
    // @Size(min = 6, message = "Поле newPassword должно содержать не менее {min}")
    private String newPassword; //only for update
    private String title;
    private String city;
    private String address;
    private List<String> additionalServices;
    private HashMap<BilliardTypes, Integer> inventory;
}
