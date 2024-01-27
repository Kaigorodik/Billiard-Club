package com.platform.projapp.dto.response.body;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class CurrentUserProfileResponseBody {
    @JsonProperty("username")
    private String login;
    private String name;
    private String surname;
    private String email;
}
