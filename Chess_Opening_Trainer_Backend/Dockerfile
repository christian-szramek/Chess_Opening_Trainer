# Use an official Maven image to build the JAR
FROM maven:3.9.9-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and the project source code
COPY pom.xml .
COPY src ./src

# Build the application (skip tests if you want)
RUN mvn clean package -DskipTests

# Use a smaller JDK image to run the application
FROM eclipse-temurin:21-jdk-jammy

# Set the working directory for the runtime image
WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/chess_opening_trainer_api.jar chess_opening_trainer_api.jar

# Define the entry point to run the JAR
ENTRYPOINT ["java", "-jar", "/app/chess_opening_trainer_api.jar"]
