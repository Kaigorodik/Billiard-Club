package com.platform.projapp.repository;

import com.platform.projapp.model.Price;
import com.platform.projapp.model.PriceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceRepository extends JpaRepository<Price, PriceId> {

}

