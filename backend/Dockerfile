# Use the official Maven image to build the app
FROM maven:3.9.5-eclipse-temurin-21 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy Maven files and resolve dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copy the rest of the application code
COPY src ./src

# Build the application
RUN mvn package -Dquarkus.package.type=fast-jar

# Use a lightweight JDK image to run the app
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built Quarkus app
COPY --from=build /usr/src/app/target/*-runner.jar /app/app.jar

# Expose the application port
EXPOSE 8080

# Run the Quarkus application
CMD ["java", "-jar", "/app/app.jar"]
