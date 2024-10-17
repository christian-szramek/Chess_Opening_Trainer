package com.christianszramek.Chess_Opening_Trainer_Backend;

import com.christianszramek.Chess_Opening_Trainer_Backend.model.Opening;
import com.christianszramek.Chess_Opening_Trainer_Backend.repository.OpeningRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.logging.Logger;

@Component
public class OpeningLoader implements CommandLineRunner {

    @Autowired
    private OpeningRepository openingRepository;
    private static Logger LOGGER = Logger.getLogger(OpeningLoader.class.getName());

    @Override
    public void run(String... args) throws Exception {
        // load initial openings if the opening table is empty
        if (openingRepository.findAll().isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            TypeReference<List<Opening>> typeReference = new TypeReference<>() {};
            InputStream inputStream = TypeReference.class.getResourceAsStream("/data/chess_openings.json");

            try {
                List<Opening> openings = mapper.readValue(inputStream, typeReference);
                openingRepository.saveAll(openings);
                LOGGER.info("Loaded initial openings successfully.");
            } catch (Exception e) {
                LOGGER.info("Failed to load initial openings. Exception: " + e.getMessage());
            }
        }
    }
}
