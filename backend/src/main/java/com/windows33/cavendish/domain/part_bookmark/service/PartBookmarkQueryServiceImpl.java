package com.windows33.cavendish.domain.part_bookmark.service;

import com.windows33.cavendish.domain.part_bookmark.dto.response.PartBookmarkListDto;
import com.windows33.cavendish.domain.part_bookmark.repository.PartBookmarkQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PartBookmarkQueryServiceImpl implements PartBookmarkQueryService{

    private final PartBookmarkQueryRepository partBookmarkQueryRepository;

    @Override
    public Page<PartBookmarkListDto> findPartBookmarkList(Pageable pageable, Integer partCategory, Integer userId) {
        switch(partCategory) {
            case 0:
                return partBookmarkQueryRepository.findPartBookmarkCpuList(pageable, userId);
            case 1:
                return partBookmarkQueryRepository.findPartBookmarkGpuList(pageable, userId);
            case 2:
                return partBookmarkQueryRepository.findPartBookmarkRamList(pageable, userId);
            case 3:
                return partBookmarkQueryRepository.findPartBookmarkHddList(pageable, userId);
            case 4:
                return partBookmarkQueryRepository.findPartBookmarkSsdList(pageable, userId);
            case 5:
                return partBookmarkQueryRepository.findPartBookmarkPowerList(pageable, userId);
            case 6:
                return partBookmarkQueryRepository.findPartBookmarkMainboardList(pageable, userId);
            case 7:
                return partBookmarkQueryRepository.findPartBookmarkCoolerList(pageable, userId);
            case 8:
                return partBookmarkQueryRepository.findPartBookmarkCaseList(pageable, userId);
            default:
                return null;
        }
    }

}
