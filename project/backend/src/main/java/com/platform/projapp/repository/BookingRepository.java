package com.platform.projapp.repository;

import com.platform.projapp.model.Booking;
import com.platform.projapp.model.BookingId;
import com.platform.projapp.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, BookingId> {

}

