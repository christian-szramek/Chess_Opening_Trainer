package com.christianszramek.Chess_Opening_Trainer_Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="openings")
public class Opening {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String eco;
    @ElementCollection
    @CollectionTable(name = "opening_moves", joinColumns = @JoinColumn(name = "opening_id"))
    private List<Move> moves;

    public Opening(int id) {
        this.id = id;
    }

    public Opening(String title, List<Move> moves) {
        this.title = title;
        this.moves = moves;
    }
}