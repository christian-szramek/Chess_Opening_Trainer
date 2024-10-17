package com.christianszramek.Chess_Opening_Trainer_Backend.service;

import com.christianszramek.Chess_Opening_Trainer_Backend.model.Move;
import com.christianszramek.Chess_Opening_Trainer_Backend.model.Opening;
import com.christianszramek.Chess_Opening_Trainer_Backend.repository.OpeningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OpeningService {
    private List<Opening> initialOpenings = new ArrayList<>(List.of(
            new Opening("Italienische Partie", List.of(new Move("e2", "e4")))
    ));

    @Autowired
    private OpeningRepository openingRepository;

    public List<Opening> getAllOpenings() {
        return openingRepository.findAll();
    }

    public Opening getOpening(int openingId) {
        return openingRepository.findById(openingId).orElse(new Opening(-1));
    }

    public Opening saveOrUpdateOpening(Opening opening) {
        return openingRepository.save(opening);
    }

    public void deleteOpening(int openingId) {
        openingRepository.deleteById(openingId);
    }
}
