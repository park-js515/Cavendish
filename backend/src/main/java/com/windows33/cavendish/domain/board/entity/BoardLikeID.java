package com.windows33.cavendish.domain.board.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class BoardLikeID implements Serializable {

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "board_id")
    private Integer boardId;

}
