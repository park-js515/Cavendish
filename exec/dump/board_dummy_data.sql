USE s09p22c105;

INSERT INTO users (login_id, password, nickname)
VALUES ('userId1', '{bcrypt}$2a$10$x3206lHzBR0.Oio9qwW1xePDxUdmEJS/2gRsk/kvpvEEgEnzbKQUq', 'nickname1'),
       ('userId2', '{bcrypt}$2a$10$x3206lHzBR0.Oio9qwW1xePDxUdmEJS/2gRsk/kvpvEEgEnzbKQUq', 'nickname2'),
       ('userId3', '{bcrypt}$2a$10$x3206lHzBR0.Oio9qwW1xePDxUdmEJS/2gRsk/kvpvEEgEnzbKQUq', 'nickname3');

INSERT INTO boards (user_id, title, contents)
VALUES (1, 'title1', 'contents20'),
       (1, 'title2', 'contents19'),
       (1, 'title3', 'contents18'),
       (1, 'title4', 'contents17'),
       (1, 'title5', 'contents16'),
       (1, 'title6', 'contents15'),
       (1, 'title7', 'contents14'),
       (1, 'title8', 'contents13'),
       (1, 'title9', 'contents12'),
       (1, 'title10', 'contents11'),
       (2, 'title11', 'contents10'),
       (2, 'title12', 'contents9'),
       (2, 'title13', 'contents8'),
       (2, 'title14', 'contents7'),
       (2, 'title15', 'contents6'),
       (2, 'title16', 'contents5'),
       (2, 'title17', 'contents4'),
       (2, 'title18', 'contents3'),
       (2, 'title19', 'contents2'),
       (2, 'title20', 'contents1');