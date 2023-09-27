package com.windows33.cavendish.domain.image.controller;

import com.windows33.cavendish.domain.board.entity.Board;
import com.windows33.cavendish.domain.board.entity.BoardImage;
import com.windows33.cavendish.domain.board.repository.BoardImageRepository;
import com.windows33.cavendish.domain.board.repository.BoardQueryRepository;
import com.windows33.cavendish.global.exception.NotFoundException;
import com.windows33.cavendish.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import static com.windows33.cavendish.domain.board.entity.QBoardImage.boardImage;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {

    private final BoardImageRepository boardImageRepository;

    @GetMapping(
            value="/{id}",
            produces={MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE}
    )
    public byte[] display(
            @PathVariable("id") Integer id
    ) throws IOException {
        BoardImage boardImage = boardImageRepository.findById(id).orElseThrow(() -> new NotFoundException(BoardImage.class, id));

        String path = boardImage.getImagePath();

        File data = new File(path);
        byte[] imgBytes = Files.readAllBytes(data.toPath());

        return imgBytes;
    }

}
