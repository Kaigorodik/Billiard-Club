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
public class PriceId implements Serializable {
    @Column(name = "schedule_id")
    private Long scheduleId;
    @Column(name = "billiard_type")
    private BilliardTypes billiardType;
}
