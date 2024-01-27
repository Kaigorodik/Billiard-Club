package com.platform.projapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * @author Kaigorodova Liubov
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenRefreshRequest {
    private UUID tokenRefresh;
}
