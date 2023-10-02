package com.windows33.cavendish.domain.part_bookmark.service;

import com.windows33.cavendish.domain.part_bookmark.dto.request.PartBookmarkAddRequestDto;

public interface PartBookmarkService {

    Integer addPartBookmark(PartBookmarkAddRequestDto partBookmarkAddRequestDto, Integer userId);

}
