FROM adoptopenjdk/openjdk11
ARG JAR_FILE=.
COPY ${JAR_FILE} Cavendish-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/Cavendish-0.0.1-SNAPSHOT.jar"]