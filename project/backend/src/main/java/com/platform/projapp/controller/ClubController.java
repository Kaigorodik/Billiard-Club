package com.platform.projapp.controller;

import com.platform.projapp.dto.response.GeneralResponse;
import com.platform.projapp.dto.response.body.ClubResponseShortBody;
import com.platform.projapp.dto.response.body.ClubsResponseEntity;
import com.platform.projapp.model.Club;
import com.platform.projapp.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {
    private final ClubService clubService;

    @GetMapping
    public ResponseEntity<?> getClubs(@RequestParam(name = "city") String city,
                                      @RequestParam(name = "filters", required = false) String filters,
                                      @PageableDefault(size = 9) Pageable pageable) {
        var response = new GeneralResponse<>();
        Page<Club> page = clubService.findAllByCityAndFilters(city, pageable);

        List<ClubResponseShortBody> clubsResponse = page.stream()
                .map(ClubResponseShortBody::fromClub)
                .collect(Collectors.toList());


        ClubsResponseEntity clubsResponseEntity = ClubsResponseEntity.of(
                pageable.getPageNumber(),
                page.getTotalElements(),
                clubsResponse
        );

        return ResponseEntity.ok(response.withData(clubsResponseEntity));
    }
}
