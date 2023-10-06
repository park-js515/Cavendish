
# cavendish 포팅 메뉴얼  

## 컨테이너 이미지  

spring: backend 폴더 내 cavendish-spring.Dockerfile로 생성
festAPI: recommend 폴더 내 cavendish-python.Dockerfile로 생성
mariadb: mariadb:latest로 생성, root의 비밀번호는 ssafy로 한다.


## 필수 환경 변수  

**spring-server**  

- `SPRING_DATASOURCE_URL`: MariaDB 서버 주소  
- `SPRING_DATASOURCE_USERNAME`: root    
- `SPRING_DATASOURCE_PASSWORD`: ssafy   

**fastAPI-server**  

- `fastAPI_DATASOURCE_URL`: DB 컨테이너 ip주소  
- `fastAPI_DATASOURCE_USERNAME`: root  
- `fastAPI_DATASOURCE_PASSWORD`: ssafy

## spring 빌드 및 설정  

빌드 파일이 있기때문에 위에서 만든 spring 이미지를 이용해 5000번 포트로
컨테이너를 실행시킨다.

## fastAPI 빌드 및 설정  

빌드 파일이 있기때문에 위에서 만든 fastAPI 이미지를 이용해 8000번 포트로
컨테이너를 실행시킨다.


## mariadb 및 설정  

위에서 만든 mariadb 이미지를 이용해 3306번 포트로 컨테이너를 실행시킨다.
mariadb 컨테이너 내에서 exec/dump 폴더 내 sql문을 동작시킨다.

## 프로젝트 종속성  

- MariaDB: 11.1.2  
- JDK: 11.0.19  
- Gradle: 8.2.1  
- Spring Boot: 2.7.15  
- python: 3.9.13
- Node.js: 18.17.1 LTS
- npm: 10.1.0  
- React: 18.2.0
