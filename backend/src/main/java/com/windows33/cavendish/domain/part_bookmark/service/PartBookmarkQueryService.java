package com.windows33.cavendish.domain.part_bookmark.service;

import com.windows33.cavendish.domain.part_bookmark.dto.response.PartBookmarkListDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PartBookmarkQueryService {

    Page<PartBookmarkListDto> findPartBookmarkList(Pageable pageable, Integer partCategory, Integer userId);

}
