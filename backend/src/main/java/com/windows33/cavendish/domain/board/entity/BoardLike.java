package com.windows33.cavendish.domain.board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@SuperBuilder
@NoArgsConstructor
@Table(name = "boards_like")
@Entity
public class BoardLike {

    @EmbeddedId
    private BoardLikeID boardLikeID;

}
