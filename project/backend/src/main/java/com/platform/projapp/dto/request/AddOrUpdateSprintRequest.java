package com.platform.projapp.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AddOrUpdateSprintRequest {
    private Long sprintId;
    private Long projectId;
    private Integer number;
    private String goals;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDate startDate;
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDate endDate;
    private String presentation;
}
