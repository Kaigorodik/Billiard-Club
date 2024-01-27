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
@Table(name = "clubs")
public class Club {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "club_id")
    private Long id;
    @Column(name = "admin_id")
    private Long adminId;
    @Column(name = "title")
    private String title;
    @Column(name = "city")
    private String city;
    @Column(name = "address")
    private String address;
    @Column(name = "url")
    private String url;
    @Column(name = "phone")
    private String phone;
}