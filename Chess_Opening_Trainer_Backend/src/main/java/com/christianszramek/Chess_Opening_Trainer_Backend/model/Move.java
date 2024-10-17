package com.christianszramek.Chess_Opening_Trainer_Backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Move {
    @Column(name = "\"from\"")
    private String from;
    @Column(name = "\"to\"")
    private String to;
}
