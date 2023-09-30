package com.windows33.cavendish.domain.image;

import com.windows33.cavendish.domain.board.entity.BoardImage;
import com.windows33.cavendish.domain.board.repository.BoardImageRepository;
import com.windows33.cavendish.global.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

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
