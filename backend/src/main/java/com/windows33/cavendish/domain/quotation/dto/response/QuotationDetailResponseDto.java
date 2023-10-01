package com.windows33.cavendish.domain.quotation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuotationDetailResponseDto {

    private String name;
    private Integer cpuId;
    private Integer gpuId;
    private Integer ramId;
    private Integer hddId;
    private Integer ssdId;
    private Integer powerId;
    private Integer mainboardId;
    private Integer coolerId;
    private Integer caseId;
    private String createDateTime;

}