package com.platform.projapp.repository;

import com.platform.projapp.model.Club;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    Club findByTitle(String title);

    Boolean existsByTitleAndCity(String title, String city);

    Page<Club> findAllByCity(String city, Pageable pageable);
}

