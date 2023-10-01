package com.windows33.cavendish.domain.part.entity;

import com.windows33.cavendish.global.entity.PartCommonEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "cpu")
@Entity
public class CPU extends PartCommonEntity {

    private String code;

    private String socket;

    private Integer coreNumber;

    private Integer threadNumber;

    private Integer l2Cache;

}
