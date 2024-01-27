package com.platform.projapp.service;

import com.platform.projapp.dto.request.RegisterOrUpdateClubRequest;
import com.platform.projapp.model.Club;
import com.platform.projapp.repository.ClubRepository;
import com.platform.projapp.service.mappers.ClubMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClubService {
    private final ClubRepository clubRepository;
    private final ClubMapper clubMapper;
    private final UserService userService;
    private final TableService tableService;

    public Club findById(Long id) {
        return clubRepository.findById(id).orElse(null);
    }

    public Club findByTitle(String title) {
        return clubRepository.findByTitle(title);
    }

    public void addClub(RegisterOrUpdateClubRequest registerRequest) {
        if (registerRequest.getPassword() != null) {
            var club = clubMapper.dtoToEntity(registerRequest);
            var admin = userService.findByUserName(registerRequest.getEmail());
            club.setAdminId(admin.getId());
            clubRepository.save(club);
            tableService.addTablesToClub(registerRequest.getInventory(), club.getId());
        }
    }

    public Page<Club> findAllByCityAndFilters(String city, Pageable pageable) {
        return clubRepository.findAllByCity(city, pageable);
    }
}