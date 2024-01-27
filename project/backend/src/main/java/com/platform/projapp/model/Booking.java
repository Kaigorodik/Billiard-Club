package com.platform.projapp.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "bookings")
public class Booking {
    @EmbeddedId
    private BookingId id;
    @Column(name = "date")
    private Date dateTime;
}
