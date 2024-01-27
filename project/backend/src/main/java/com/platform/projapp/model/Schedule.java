package com.platform.projapp.model;

import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.time.DayOfWeek;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "schedules")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "schedule_id")
    private Long id;
    @Column(name = "club_id")
    private Long clubId;
    @Column(name = "weekday")
    private DayOfWeek weekday;
    @Column(name = "start_time")
    private Time startTime;
    @Column(name = "end_time")
    private Time endTime;
}
