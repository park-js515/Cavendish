package com.windows33.cavendish.domain.part_bookmark.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PartBookmarkAddRequestDto {

    private Integer partCategory;
    private Integer partId;

}
