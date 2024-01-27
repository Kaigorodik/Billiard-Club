package com.platform.projapp.model;

import org.springframework.security.core.GrantedAuthority;

/**
 * @author Kaigorodova Liubov
 */

public enum AccessRole implements GrantedAuthority {
    ROLE_CLIENT,
    ROLE_BUSINESS;

    @Override
    public String getAuthority() {
        return name();
    }
}
