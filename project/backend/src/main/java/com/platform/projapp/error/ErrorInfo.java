package com.platform.projapp.error;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author Kaigorodova Liubov
 */

@Data
@AllArgsConstructor(staticName = "of")
public class ErrorInfo {
    private String code;
    private String message;
}
