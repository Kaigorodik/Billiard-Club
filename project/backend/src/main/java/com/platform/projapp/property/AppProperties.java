package com.platform.projapp.property;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * @author Kaigorodova Liubov
 */
@Data
@Component
@ConfigurationProperties(prefix = "app.jwt")
public class AppProperties {
    private String secret;
    private Long expirationMs;
    private Long refreshExpirationMs;

}
