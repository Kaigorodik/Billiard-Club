package com.platform.projapp.service.mappers;

import com.platform.projapp.dto.request.RegisterOrUpdateUserRequest;
import com.platform.projapp.dto.response.body.CurrentUserProfileResponseBody;
import com.platform.projapp.dto.response.body.CurrentUserResponseBody;
import com.platform.projapp.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    CurrentUserProfileResponseBody userToProfileDto(User user);
    CurrentUserResponseBody userToDto(User user);



    User dtoToEntity(RegisterOrUpdateUserRequest dto);
}
