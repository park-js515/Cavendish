package com.windows33.cavendish.domain.quotation.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuotationAddRequestDto {

    private Integer cpuId;
    private Integer powerId;
    private Integer mainboardId;
    private Integer ramId;
    private Integer graphicId;
    private Integer hddId;
    private Integer ssdId;
    private Integer caseId;
    private Integer coolerId;
    private String name;

}
