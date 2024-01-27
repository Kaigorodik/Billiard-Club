package com.platform.projapp.dto.response.body;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Locale;

public enum Role {
    CLIENT,
    CLUB;

    @JsonValue
    public String getValue() {
        return this.toString().toLowerCase(Locale.ROOT);
    }
}
