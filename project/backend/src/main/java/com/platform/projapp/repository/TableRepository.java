package com.platform.projapp.repository;

import com.platform.projapp.model.BilliardTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableRepository extends JpaRepository<BilliardTable, Long> {

}
