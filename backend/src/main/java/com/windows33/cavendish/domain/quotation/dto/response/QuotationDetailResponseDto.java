package com.windows33.cavendish.domain.quotation.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuotationDetailResponseDto {

    private String name;

    // cpu
    private Integer cpuId;
    private String cpuName;
    private Integer cpuPrice;
    private String cpuImage;

    // gpu
    private Integer gpuId;
    private String gpuName;
    private Integer gpuPrice;
    private String gpuImage;

    // ram
    private Integer ramId;
    private String ramName;
    private Integer ramPrice;
    private String ramImage;

    // hdd
    private Integer hddId;
    private String hddName;
    private Integer hddPrice;
    private String hddImage;

    // ssd
    private Integer ssdId;
    private String ssdName;
    private Integer ssdPrice;
    private String ssdImage;

    // power
    private Integer powerId;
    private String powerName;
    private Integer powerPrice;
    private String powerImage;

    // mainboard
    private Integer mainboardId;
    private String mainboardName;
    private Integer mainboardPrice;
    private String mainboardImage;

    // cooler
    private Integer coolerId;
    private String coolerName;
    private Integer coolerPrice;
    private String coolerImage;

    // case
    private Integer caseId;
    private String caseName;
    private Integer casePrice;
    private String caseImage;

    private Integer totalPrice;
    private String createDateTime;

}