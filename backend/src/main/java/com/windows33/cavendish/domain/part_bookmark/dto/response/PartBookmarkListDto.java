package com.windows33.cavendish.domain.part_bookmark.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartBookmarkListDto {

    private String name;
    private Integer partCategory;
    private Integer partId;
    private String image;
    private Integer price;

}
