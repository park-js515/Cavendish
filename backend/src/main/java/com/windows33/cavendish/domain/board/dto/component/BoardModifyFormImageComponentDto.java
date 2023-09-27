package com.windows33.cavendish.domain.board.dto.component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardModifyFormImageComponentDto {

    private MultipartFile file;
    private Integer imageId;

}
