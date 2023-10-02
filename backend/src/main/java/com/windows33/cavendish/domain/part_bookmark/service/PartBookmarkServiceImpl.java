package com.windows33.cavendish.domain.part_bookmark.service;

import com.windows33.cavendish.domain.part_bookmark.dto.request.PartBookmarkAddRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PartBookmarkServiceImpl implements PartBookmarkService{

    @Override
    public Integer addPartBookmark(PartBookmarkAddRequestDto partBookmarkAddRequestDto, Integer userId) {

        return null;
    }

}
