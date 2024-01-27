package com.platform.projapp.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "prices")
public class Price {
    @EmbeddedId
    private PriceId id;
    @Column(name = "price")
    private int price;
}
