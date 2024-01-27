package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.AccessRole;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CurrentUserResponseBody {
    private String name;
    private String surname;
    private String login;
    private AccessRole role;
}
