package com.christianszramek.Chess_Opening_Trainer_Backend.controller;

import com.christianszramek.Chess_Opening_Trainer_Backend.model.Opening;
import com.christianszramek.Chess_Opening_Trainer_Backend.service.OpeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:8080")
@CrossOrigin()
public class OpeningController {
    @Autowired
    private OpeningService openingService;

    @GetMapping("/openings")
    public ResponseEntity<List<Opening>> getAllOpenings() {
        List<Opening> openings = openingService.getAllOpenings();

        if (openings == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(openings, HttpStatus.OK);
    }

    @GetMapping("/openings/{openingId}")
    public ResponseEntity<Opening> getOpening(@PathVariable int openingId) {
        Opening opening = openingService.getOpening(openingId);

        if (opening.getId() > 0) {
            return new ResponseEntity<>(opening, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/opening")
    public ResponseEntity<?> saveOpening(@RequestBody Opening opening) {
        Opening savedOpening = null;
        try {
            savedOpening = openingService.saveOrUpdateOpening(opening);
            return new ResponseEntity<>(savedOpening, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/opening/{openingId}")
    public ResponseEntity<?> updateOpening(@PathVariable int openingId, @RequestBody Opening opening) {
        Opening updatedOpening = null;
        try {
            updatedOpening = openingService.saveOrUpdateOpening(opening);
            return new ResponseEntity<>(updatedOpening, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/opening/{openingId}")
    public ResponseEntity<Integer> deleteOpening(@PathVariable int openingId){
        Opening opening = openingService.getOpening(openingId);
        if (opening.getId() > 0) {
            openingService.deleteOpening(openingId);
            return new ResponseEntity<>(openingId, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



}
