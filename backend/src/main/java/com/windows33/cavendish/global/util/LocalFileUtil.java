package com.windows33.cavendish.global.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Component
public class LocalFileUtil {

    private final String currentPath = System.getProperty("user.dir");

    public List<String> uploadFiles(String fileType, List<MultipartFile> multipartFiles) {
        StringBuilder uploadFilePath = new StringBuilder();
        List<String> filePaths = new ArrayList<>();

        uploadFilePath
                .append(currentPath)
                .append("/")
                .append("CavendishStore")
                .append("/")
                .append(fileType)
                .append("/")
                .append(getDate());

        for (MultipartFile multipartFile : multipartFiles) {
            String originalFileName = multipartFile.getOriginalFilename();
            String uploadFileName = getUuidFileName(originalFileName);
            String uploadFileUrl = uploadFilePath + "/" + uploadFileName;

            // 파일 저장
            try {
                multipartFile.transferTo(new File(uploadFileUrl));
            } catch (IOException e) {
                e.printStackTrace();
                log.error("Filed upload failed", e);
            }

            filePaths.add(uploadFileUrl);
        }

        return filePaths;
    }

    // 날짜 문자열 생성(연/월/일)
    private String getDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
        Date date = new Date();
        String str = sdf.format(date);
        return str.replace("-", "/");
    }

    // UUID 생성
    private String getUuidFileName(String fileName) {
        String ext = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID().toString() + "." + ext;
    }

}
