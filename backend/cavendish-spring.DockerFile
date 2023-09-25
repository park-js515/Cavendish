FROM adoptopenjdk/openjdk11
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} cavendish-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/cavendish-0.0.1-SNAPSHOT.jar"]