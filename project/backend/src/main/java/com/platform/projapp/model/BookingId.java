package com.platform.projapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class BookingId implements Serializable {
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "table_id")
    private Long tableId;
    @Column(name = "schedule_id")
    private Long scheduleId;
}
