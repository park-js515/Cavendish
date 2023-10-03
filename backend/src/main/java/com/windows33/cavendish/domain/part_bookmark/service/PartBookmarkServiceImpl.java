package com.windows33.cavendish.domain.part_bookmark.service;

import com.windows33.cavendish.domain.part_bookmark.dto.request.PartBookmarkAddRequestDto;
import com.windows33.cavendish.domain.part_bookmark.entity.PartBookmark;
import com.windows33.cavendish.domain.part_bookmark.repository.PartBookmarkRepository;
import com.windows33.cavendish.global.exception.InvalidException;
import com.windows33.cavendish.global.exception.NotFoundException;
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

    @Override
    public void removePartBookmark(Integer partBookmarkId, Integer userId) {
        PartBookmark partBookmark = checkAuthority(partBookmarkId, userId);

        partBookmarkRepository.delete(partBookmark);
    }

    private PartBookmark checkAuthority(Integer partBookmarkId, Integer userId) {
        PartBookmark partBookmark = partBookmarkRepository.findById(partBookmarkId).orElseThrow(() -> new NotFoundException(PartBookmark.class, partBookmarkId));

        if(!partBookmark.getUserId().equals(userId)) {
            throw new InvalidException(PartBookmark.class, partBookmarkId);
        }

        return partBookmark;
    }

}
