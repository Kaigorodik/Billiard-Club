package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Kaigorodova Liubov
 */
@Data
@AllArgsConstructor
public class JwtResponseBody implements ResponseBody {
    private String accessToken;
    private String refreshToken;
    private UserLoginDTO user; //TODO: !!! ЗАМЕНИТЬ НА DTO !!! - не нужно возвращать всё подряд
}
