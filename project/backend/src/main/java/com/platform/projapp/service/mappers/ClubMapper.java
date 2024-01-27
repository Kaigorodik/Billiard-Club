package com.platform.projapp.service.mappers;

import com.platform.projapp.dto.request.RegisterOrUpdateClubRequest;
import com.platform.projapp.model.Club;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClubMapper {
    Club dtoToEntity(RegisterOrUpdateClubRequest dto);
}
