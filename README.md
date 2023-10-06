# Cavendish 소개

## 프로젝트 소개

- 프로젝트명: Cavendish(컴퓨터 추천 시스템)

- 프로젝트 기간: 2023-8-23 ~ 2023-10-06

- 주요 기능
    - 빅데이터를 이용한 컴퓨터 추천 시스템
    - 컴퓨터 견적서 저장
    - 컴퓨터 관련 소통 커뮤니티

- 참조 리소스
    - https://www.danawa.com/
    - https://kjwwang.com/
    - https://codepen.io/
    - https://react.dev/
    - https://docs.docker.com/

- 배포 환경
    - https://j9c105.p.ssafy.io/

- API 연동 규격서
    - https://j9c105.p.ssafy.io/api/swagger-ui/index.html


## Cavendish: 컴퓨터 추천 시스템
<img src="/uploads/46e3c3c15b318d81ca318b4684682339/logo.png" style="height: 400px; aespect-ratio: 1/1;">


## 팀원 소개

<table align="center">
    <tr align="center">
        <td>
            팀장/Data
        </td>
        <td>
            Backend
        </td>
        <td>
            CI/CD
        </td>
        <td>
            Frontend/Data
        </td>
        <td>
            Frontend
        </td>
        <td>
            Data
        </td>
    </tr>
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/jhy1812">
              <img src="https://avatars.githubusercontent.com/u/122588619?v=4" width="200">
              <br />
              <b>jhy1812</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/imbeom35">
              <img src="https://avatars.githubusercontent.com/u/97426151?v=4" width="200">
              <br />
              <b>imbeom35</b>
            </a>
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/wnsdlf925">
              <img src="https://avatars.githubusercontent.com/u/62425882?v=4" width="200">
              <br />
              <b>wnsdlf925</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/Jeongp4939">
              <img src="https://avatars.githubusercontent.com/u/86696920?v=4" width="200">
              <br />
              <b>Jeongp4939</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/park-js515">
              <img src="https://avatars.githubusercontent.com/u/122588631?v=4" width="200">
              <br />
              <b>park-js515</b>
            </a> 
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/yangJin-H">
              <img src="https://avatars.githubusercontent.com/u/68081743?v=4" width="200">
              <br />
              <b>yangJin-H</b>
            </a> 
        </td>
    </tr>
    <tr align="center">
        <td>
            정호윤
        </td>
        <td>
            김범창
        </td>
        <td>
            권준일
        </td>
        <td>
            박정훈
        </td>
        <td>
            박주성
        </td>
        <td>
            양진형
        </td>
    </tr>
</table>

# Cavendish 포팅 메뉴얼  

## 컨테이너 이미지  

spring: backend 폴더 내 cavendish-spring.Dockerfile로 생성  
fastAPI: recommend 폴더 내 cavendish-python.Dockerfile로 생성  
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
