package com.platform.projapp.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(unique = true, name = "token")
    private UUID token;

    @Column(name = "expiry_date")
    private ZonedDateTime expiryDate;

    @Column(name = "user_login")
    private String userLogin;

    public RefreshToken(UUID token, ZonedDateTime expiryDate, String userLogin) {
        this.token = token;
        this.expiryDate = expiryDate;
        this.userLogin = userLogin;
    }
}
