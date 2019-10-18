--delete from files;
--delete from requests;

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (1,'0358/101','a','a','a@gmail.com','4564548','2017','UTN-FRLP',0,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (1,'0358/101','2017','UTN-FRLP','informatica','2011','Algebra','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00',1),(2,'0358/101','2017','UTN-FRLP','informatica','2011','Analisis','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00',1),(3,'0358/101','2017','UTN-FRLP','informatica','2011','Matematica','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00',1);

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (2,'0358/102','a','a','a@gmail.com','4564548','2017','UTN-FRLP',1,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (4,'0358/102','2017','UTN-FRLP','informatica','2011','Algebra','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','APROBADA','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:28:28.436 +00:00','2019-10-11 19:28:28.436 +00:00',2),(5,'0358/102','2017','UTN-FRLP','informatica','2011','Analisis','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','APROBADA','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:28:28.436 +00:00','2019-10-11 19:28:28.436 +00:00',2),(6,'0358/102','2017','UTN-FRLP','informatica','2011','Matematica','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','APROBADA','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:28:28.436 +00:00','2019-10-11 19:28:28.436 +00:00',2);

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (3,'0358/103','a','a','a@gmail.com','4564548','2017','UTN-FRLP',0,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (7,'0358/103','2017','UTN-FRLP','informatica','2011','Algebra','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:29:50.887 +00:00','2019-10-11 19:29:50.887 +00:00',3),(8,'0358/103','2017','UTN-FRLP','informatica','2011','Analisis','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:29:50.887 +00:00','2019-10-11 19:29:50.887 +00:00',3);

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (4,'0358/104','a','a','a@gmail.com','4564548','2017','UTN-FRLP',0,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (9,'0358/104','2017','UTN-FRLP','informatica','2015','Algebra','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:30:19.988 +00:00','2019-10-11 19:30:19.988 +00:00',4),(10,'0358/104','2017','UTN-FRLP','informatica','2015','Analisis','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:30:19.988 +00:00','2019-10-11 19:30:19.988 +00:00',4),(11,'0358/104','2017','UTN-FRLP','informatica','2015','Matematica','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:30:19.988 +00:00','2019-10-11 19:30:19.988 +00:00',4);

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (5,'0358/105','a','a','a@gmail.com','4564548','2017','UTN-FRLP',0,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (12,'0358/105','2017','UTN-FRLP','informatica','2015','Algebra','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:30:36.022 +00:00','2019-10-11 19:30:36.022 +00:00',5),(13,'0358/105','2017','UTN-FRLP','informatica','2015','Analisis','cuatrimestral','8','144','2012','TPI','Matematica 2','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:30:36.022 +00:00','2019-10-11 19:30:36.022 +00:00',5);

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (6,'0358/106','a','a','a@gmail.com','4564548','2017','UTN-FRLP',0,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (14,'0358/106','2017','UTN-FRLP','informatica','2015','intro','cuatrimestral','8','144','2012','TPI','Orga','8','144','Básico','16','2013','Fidel','SIN EVALUAR','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:30:50.495 +00:00','2019-10-11 19:30:50.495 +00:00',6);

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (7,'0358/107','a','a','a@gmail.com','4564548','2017','UTN-FRLP',1,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (15,'0358/107','2017','UTN-FRLP','informatica','2011','intro','cuatrimestral','8','144','2012','TPI','Orga','8','144','Básico','16','2013','Fidel','NEGADA','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:31:06.025 +00:00','2019-10-11 19:31:06.025 +00:00',7);

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (8,'0358/108','a','a','a@gmail.com','4564548','2017','UTN-FRLP',1,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (16,'0358/108','2017','UTN-FRLP','informatica','2011','intro','cuatrimestral','8','144','2012','TPI','Orga','8','144','Básico','16','2013','Fidel','NEGADA','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:31:37.929 +00:00','2019-10-11 19:31:37.929 +00:00',8),(17,'0358/108','2017','UTN-FRLP','informatica','2011','BASE DE DATOS','cuatrimestral','8','144','2012','TPI','Orga','8','144','Básico','16','2013','Fidel','RESPONDIDA','-','2019-10-11 19:31:37.929 +00:00','2019-10-11 19:31:37.929 +00:00',8);

INSERT INTO "files" ("id","file_number","name","surname","mail","dni","year_note","university_origin","status","created_at","updated_at") 
VALUES (9,'1358/109','a','a','a@gmail.com','4564548','2017','UTN-FRLP',1,'2019-10-11 19:25:37.078 +00:00','2019-10-11 19:25:37.078 +00:00');
INSERT INTO "requests" ("id","file_number","year_note","university_origin","career_origin","year_plan_origin","subject_origin","course_mode","subject_origin_weekly_hours","subject_origin_total_hours","year_of_approval","career_unq","subject_unq","subject_weekly_hours_unq","subject_total_hours_unq","subject_core_unq","credits","year_of_equivalence","signature","equivalence","observations","created_at","updated_at","fk_fileid") VALUES (18,'0358/109','2017','UTN-FRLP','informatica','2011','intro','cuatrimestral','8','144','2012','TPI','Orga','8','144','Básico','16','2013','Fidel','NEGADA','Reconfeccionar formulario según Res CD CyT 151/08.','2019-10-11 19:31:06.025 +00:00','2019-10-11 19:31:06.025 +00:00',9);

UPDATE "requests" SET "professor_equivalence"='NEGADA', "professor_observations"='No cumple con los contenidos' WHERE "id" = 18;
