package com.platform.projapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.platform.projapp.error.ErrorInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Kaigorodova Liubov
 */
@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GeneralResponse<T> {
    private String message;
    private T data;

    public GeneralResponse<T> withError(String message) {
        this.message = message;
        this.data = null;
        return this;
    }

    public GeneralResponse<T> withData(T data) {
        this.data = data;
        this.message = null;
        return this;
    }

    public boolean success() {
        return data != null;
    }
}
