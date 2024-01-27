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
@Table(name = "tables")
public class BilliardTable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "table_id")
    private Long id;
    @Column(name = "club_id")
    private Long clubId;
    @Column(name = "billiard_type")
    private BilliardTypes type;
}