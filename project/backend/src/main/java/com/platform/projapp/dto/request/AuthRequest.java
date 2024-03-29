package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Kaigorodova Liubov
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    private String login;
    private String password;
}
