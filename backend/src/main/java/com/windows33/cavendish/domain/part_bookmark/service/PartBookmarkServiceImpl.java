package com.windows33.cavendish.domain.part_bookmark.service;

import com.windows33.cavendish.domain.part_bookmark.dto.request.PartBookmarkAddRequestDto;
import com.windows33.cavendish.domain.part_bookmark.entity.PartBookmark;
import com.windows33.cavendish.domain.part_bookmark.repository.PartBookmarkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PartBookmarkServiceImpl implements PartBookmarkService{

    private final PartBookmarkRepository partBookmarkRepository;

    @Override
    public Integer addPartBookmark(PartBookmarkAddRequestDto partBookmarkAddRequestDto, Integer userId) {
        PartBookmark.PartBookmarkBuilder partBookmark = PartBookmark.builder()
                .userId(userId)
                .partCategory(partBookmarkAddRequestDto.getPartCategory())
                .partId(partBookmarkAddRequestDto.getPartId());

        Integer partBookmarkId = partBookmarkRepository.save(partBookmark.build()).getId();

        return partBookmarkId;
    }

}
