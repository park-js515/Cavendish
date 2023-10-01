package com.windows33.cavendish.domain.quotation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuotationListResponseDto {

    private Integer quotationId;
    private String name;
    private String imagePath;
    private String createDateTime;

}
