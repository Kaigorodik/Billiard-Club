package com.platform.projapp.dto.response.body;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor(staticName = "of")
public class ClubsResponseEntity implements ResponseBody {
    private int page;
    private Long totalCount;
    private List<ClubResponseShortBody> data;
}
