package com.christianszramek.Chess_Opening_Trainer_Backend.repository;

import com.christianszramek.Chess_Opening_Trainer_Backend.model.Opening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpeningRepository extends JpaRepository<Opening, Integer> {
}
