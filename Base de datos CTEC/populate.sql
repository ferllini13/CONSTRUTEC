insert into rol(id,_type)
values(1,0);
insert into rol(id,_type)
values(2,1);
insert into rol(id,_type)
values(3,2);
insert into rol(id,_type)
values(4,3);

select * from create_user(1,'Jairo', 'Mendez', '116860519','123','jairo-mm','85193885', 2, 12345);
select * from create_user(2,'Jason', 'Laiton', '114568596','123','jajoji','70000043', 1, 12344);
select * from create_user(3,'Elmo', 'Fernandez', '159753789','123','memo','86693887', 2, 12340);
select * from create_user(4,'Fran', 'Alvarado', '112348526','123','fran','85431697', 3, 12343);
select * from create_user(5,'Daniel', 'Moya', '114567896','123','daniel','84759635', 4, 12341);
select * from create_user(6,'Ricardo', 'Gonzales', '114560519','123','richy','83458796', 2, 123420);
select * from create_user(7,'Hazel', 'Martinez', '789520123','123','hazel','83435210', 1, 1);
select * from create_user(8,'Melissa', 'Fernandez', '158753658','123','meli_F','68524123', 2, 0);


select * from create_stage(0, 'Trabajo Preliminar');
select * from create_stage(1,'Cimientos');
select * from create_stage(2,'Paredes');
select * from create_stage(3,'Concreto Reforzado');
select * from create_stage(4,'Techos');
select * from create_stage(5,'Cielos');
select * from create_stage(6,'Repello');
select * from create_stage(7,'Entrepisos');
select * from create_stage(8,'Pisos');
select * from create_stage(9,'Enchapes');
select * from create_stage(10,'Instalacion Pluvial');
select * from create_stage(11,'Instalacion Sanitaria');
select * from create_stage(12,'Instalacion electrica');
select * from create_stage(13,'Puertas');
select * from create_stage(14,'Cerrajeria');
select * from create_stage(15,'Ventanas');
select * from create_stage(16,'Closets');
select * from create_stage(17,'Mueble de pintura');
select * from create_stage(18,'Escaleras');


select * from create_construction(0, 'Turrialba', 1, 2);
select * from create_construction(1, 'Cartago', 3, 2);
select * from create_construction(2, 'TEC', 8, 7);
