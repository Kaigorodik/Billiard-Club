package com.platform.projapp.repository;

import com.platform.projapp.model.RefreshToken;
import com.platform.projapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByToken(UUID token);

    RefreshToken findByUserLogin(String userLogin);
}
