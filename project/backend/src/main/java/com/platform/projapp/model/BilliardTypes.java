package com.platform.projapp.model;

import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Locale;

public enum BilliardTypes {
    RUSSIAN,
    POOL,
    SNOOKER;

    @JsonValue
    public String getValue() {
        return this.toString().toLowerCase(Locale.ROOT);
    }
}
