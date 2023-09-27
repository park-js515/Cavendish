package com.windows33.cavendish.domain.image.controller;

import com.windows33.cavendish.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.windows33.cavendish.global.response.CommonResponse.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/image")
public class ImageController {

    @GetMapping("/{path}")
    public CommonResponse<Resource> display(
            @PathVariable("path") String path
    ) {
        String currentPath = System.getProperty("user.dir");
        String downloadPath = currentPath + path;

        Resource resource = null;

        try {
            resource = new UrlResource(downloadPath);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(!resource.exists()) throw new RuntimeException();

        HttpHeaders headers = new HttpHeaders();
        Path filePath = null;

        try {
            filePath = Paths.get(downloadPath);
            headers.add("Content-Type", Files.probeContentType(filePath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return OK(resource);
    }

}
