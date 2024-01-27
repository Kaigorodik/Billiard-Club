package com.platform.projapp.dto.response.body;

import com.platform.projapp.model.Club;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClubResponseShortBody implements ResponseBody {
    public Long id;
    public String title;
    public String address;
    public double priceMean;
    public String avatar;

    static public ClubResponseShortBody fromClub(Club club) {
        return new ClubResponseShortBody(
                club.getId(),
                club.getTitle(),
                club.getAddress(),
                200,
                null
        );
    }
}
