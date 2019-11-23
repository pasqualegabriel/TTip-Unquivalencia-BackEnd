-- Users
INSERT INTO users ("name",last_name,email,"password",code,"role",invalidation_date,created_at,updated_at) VALUES 
('Gabriel','Pasquale','pasqualeunq@gmail.com','$2a$08$flkBf9gDFI9avRdlJ.mRUOKQib9cvC.yRtzVQa1Cm55YHnYArFpQi',NULL,'admin','2019-11-23 18:23:23.606','2019-11-23 16:48:48.338','2019-11-23 18:24:39.882')
,('Nahuel','Pasquale','pasqupes12@gmail.com','$2a$08$PBkG0zug9jZ9q85fsqK7n.oh0cwASbdc7JzdlAIrBeQXOV13CkPye',NULL,'professor','2019-11-23 18:22:29.249','2019-11-23 14:38:34.255','2019-11-23 18:24:55.111')
,('Antonio','Pasquale','pasquplay12@gmail.com','$2a$08$mLtFUmdk9ET6ddcqvXd0xO.qauLAoKE6NadG2q3aOlagMP63C25ri',NULL,'user','2019-11-23 18:25:16.791','2019-11-22 14:43:14.989','2019-11-23 18:25:16.792')
;

-- Subjects
-- 1
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'1324','UNQ','TPI','2015','Orga','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 2
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'234','UNQ','TPI','2015','Algoritmos','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 3
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'343','UNLA','Informatica','2015','Labo','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 4
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'454','UNLA','Informatica','2015','poo 1','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 5
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'35','UNLA','Informatica','2015','poo 2','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 6
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'35','ITBA','Ingenieria en Informatica','2015','Labo','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 7
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'343','UNLA','Informatica','2011','Labo','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 8
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'454','UNLA','Informatica','2011','poo 1','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 9
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'35','UNLA','Informatica','2011','poo 2','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 10
INSERT INTO subjects (id,code,university,career,year_plan,subject,course_mode,subject_weekly_hours,subject_total_hours,subject_core,credits,url,created_at,updated_at) 
VALUES (DEFAULT,'234','UNQ','TPI','2015','Base de datos','cuatrimestral','12','66','obligatorio','120','url','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');

-- Files
-- 1
INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
VALUES (DEFAULT,'0358/101','Camila','Cintioli','camila@gmail.com','45657634','2017',2,'34567','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 2
INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
VALUES (DEFAULT,'0358/102','Nahuel','Autalan','nahuel@gmail.com','38675645','2017',0,'32456','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 3
INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
VALUES (DEFAULT,'0358/103','Gabriel','Pasquale','gabriel@gmail.com','35465756','2017',2,'23432','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 4
INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
VALUES (DEFAULT,'0358/104','Ivan','Dominikov','ivan@gmail.com','36435465','2017',0,'45632','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 5
INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
VALUES (DEFAULT,'0358/105','Victor','Degano','victor@gmail.com','37463635','2017',1,'76587','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 6
INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
VALUES (DEFAULT,'0358/106','Brian','Gerez','brian@gmail.com','38120918','2017',0,'98351','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 7
INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
VALUES (DEFAULT,'0358/107','Ivo','Carbone','ivo@gmail.com','33125606','2017',0,'30945','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 8
-- INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
-- VALUES (DEFAULT,'0358/108','Juan','Gutierrez','juan@gmail.com','32163748','2017',0,'27162','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 9
-- INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
-- VALUES (DEFAULT,'0358/109','Alexis','Moragues','alexis@gmail.com','31019475','2017',0,'84756','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 10
-- INSERT INTO files (id,file_number,name,surname,mail,dni,year_note,status,legajo,created_at,updated_at) 
-- VALUES (DEFAULT,'0358/110','Diego','Diz Marin','diego@gmail.com','30127457','2017',0,'21237','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');

-- Requests
-- 1 total match
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','SIN EVALUAR','N/A',1,1,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 2 total match aprobada
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','APROBADA','N/A',2,1,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 3 falta 1 para total match
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','SIN EVALUAR','N/A',3,1,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 4 total match year
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','SIN EVALUAR','N/A',1,2,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 5 total match aprobada year
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','APROBADA','N/A',2,2,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 6 falta 1 para total match year
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','SIN EVALUAR','N/A',3,2,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 7 match con distintas universidades
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','APROBADA','N/A',4,1,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 8 negadas sin evaluar
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','SIN EVALUAR','N/A',5,10,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 9 negadas
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','NEGADA','N/A',6,10,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);
-- 10 negadas 2
INSERT INTO requests (id,year_of_equivalence,signature,equivalence,observations,fk_fileid,fk_subjectid,created_at,updated_at,"type",professor_id,comments_to_professor) 
VALUES (DEFAULT,'2017','Fidel','NEGADA','N/A',7,10,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00','externa',NULL,NULL);

-- request_subjects
-- request 1
-- 1 
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,1,3,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 2
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,1,4,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 3
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,1,5,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 2
-- 4
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,2,3,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 5
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,2,4,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 6
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,2,5,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 3
-- 7
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,3,3,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 8
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,3,4,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 4
-- 9
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,4,7,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 10
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,4,8,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 11
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,4,9,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 5
-- 12
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,5,7,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 13
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,5,8,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 14
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,5,9,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 6
-- 15
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,6,7,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 16
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,6,8,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 7
-- 17
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,7,5,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 18
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,7,6,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 19
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,7,7,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 8
-- 20
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,8,4,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 21
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,8,5,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 9
-- 22
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,9,4,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 23
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,9,5,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- request 10
-- 24
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,10,8,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
-- 25
INSERT INTO request_subjects (id,request_id,subject_id,created_at,updated_at) VALUES (DEFAULT,10,9,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');

-- Info
INSERT INTO info_subjects (subject_id,year_of_approval,mark,created_at,updated_at) VALUES 
(3,'2019','7','2019-11-22 14:45:16.867','2019-11-22 14:45:16.867')
,(4,'2019','8','2019-11-22 14:45:37.430','2019-11-22 14:45:37.430')
,(5,'2018','9','2019-11-22 14:45:37.430','2019-11-22 14:45:37.430')
,(3,'2019','10','2019-11-22 14:46:06.612','2019-11-22 14:46:06.612')
,(4,'2019','6','2019-11-22 14:46:06.643','2019-11-22 14:46:06.643')
,(5,'2019','5','2019-11-22 14:46:06.643','2019-11-22 14:46:06.643')
,(3,'2017','7','2019-11-22 16:49:02.665','2019-11-22 16:49:02.665')
,(4,'2019','8','2019-11-22 16:49:02.665','2019-11-22 16:49:02.665')
,(7,'2019','9','2019-11-22 16:49:05.767','2019-11-22 16:49:05.767')
,(8,'2019','7','2019-11-22 16:49:05.767','2019-11-22 16:49:05.767');
INSERT INTO info_subjects (subject_id,year_of_approval,mark,created_at,updated_at) VALUES 
(9,'2019','7','2019-11-22 14:45:16.867','2019-11-22 14:45:16.867')
,(7,'2016','8','2019-11-22 14:45:37.430','2019-11-22 14:45:37.430')
,(8,'2019','9','2019-11-22 14:45:37.430','2019-11-22 14:45:37.430')
,(9,'2014','10','2019-11-22 14:46:06.612','2019-11-22 14:46:06.612')
,(7,'2019','6','2019-11-22 14:46:06.643','2019-11-22 14:46:06.643')
,(8,'2017','5','2019-11-22 14:46:06.643','2019-11-22 14:46:06.643')
,(5,'2019','7','2019-11-22 16:49:02.665','2019-11-22 16:49:02.665')
,(6,'2015','8','2019-11-22 16:49:02.665','2019-11-22 16:49:02.665')
,(7,'2019','9','2019-11-22 16:49:05.767','2019-11-22 16:49:05.767')
,(4,'2019','7','2019-11-22 16:49:05.767','2019-11-22 16:49:05.767');
INSERT INTO info_subjects (subject_id,year_of_approval,mark,created_at,updated_at) VALUES 
(5,'2019','7','2019-11-22 14:45:16.867','2019-11-22 14:45:16.867')
,(4,'2017','8','2019-11-22 14:45:37.430','2019-11-22 14:45:37.430')
,(5,'2019','9','2019-11-22 14:45:37.430','2019-11-22 14:45:37.430')
,(8,'2019','10','2019-11-22 14:46:06.612','2019-11-22 14:46:06.612')
,(9,'2015','6','2019-11-22 14:46:06.643','2019-11-22 14:46:06.643');

-- Request info
INSERT INTO request_info_subjects (request_id,info_subject_id,created_at,updated_at) VALUES 
(1,1,'2019-11-22 14:45:16.878','2019-11-22 14:45:16.878')
,(1,2,'2019-11-22 14:45:37.434','2019-11-22 14:45:37.434')
,(1,3,'2019-11-22 14:45:37.434','2019-11-22 14:45:37.434')
,(2,4,'2019-11-22 14:46:06.615','2019-11-22 14:46:06.615')
,(2,5,'2019-11-22 14:46:06.645','2019-11-22 14:46:06.645')
,(2,6,'2019-11-22 14:46:06.645','2019-11-22 14:46:06.645')
,(3,7,'2019-11-22 16:49:02.677','2019-11-22 16:49:02.677')
,(3,8,'2019-11-22 16:49:02.677','2019-11-22 16:49:02.677');
INSERT INTO request_info_subjects (request_id,info_subject_id,created_at,updated_at) VALUES 
(4,9,'2019-11-22 14:45:16.878','2019-11-22 14:45:16.878')
,(4,10,'2019-11-22 14:45:37.434','2019-11-22 14:45:37.434')
,(4,11,'2019-11-22 14:45:37.434','2019-11-22 14:45:37.434')
,(5,12,'2019-11-22 14:46:06.615','2019-11-22 14:46:06.615')
,(5,13,'2019-11-22 14:46:06.645','2019-11-22 14:46:06.645')
,(5,14,'2019-11-22 14:46:06.645','2019-11-22 14:46:06.645')
,(6,15,'2019-11-22 16:49:02.677','2019-11-22 16:49:02.677')
,(6,16,'2019-11-22 16:49:02.677','2019-11-22 16:49:02.677');
INSERT INTO request_info_subjects (request_id,info_subject_id,created_at,updated_at) VALUES 
(7,17,'2019-11-22 14:45:16.878','2019-11-22 14:45:16.878')
,(7,18,'2019-11-22 14:45:37.434','2019-11-22 14:45:37.434')
,(7,19,'2019-11-22 14:45:37.434','2019-11-22 14:45:37.434')
,(8,20,'2019-11-22 14:46:06.615','2019-11-22 14:46:06.615')
,(8,21,'2019-11-22 14:46:06.645','2019-11-22 14:46:06.645')
,(9,22,'2019-11-22 14:46:06.645','2019-11-22 14:46:06.645')
,(9,23,'2019-11-22 16:49:02.677','2019-11-22 16:49:02.677')
,(10,24,'2019-11-22 14:45:16.878','2019-11-22 14:45:16.878')
,(10,25,'2019-11-22 14:45:37.434','2019-11-22 14:45:37.434');
