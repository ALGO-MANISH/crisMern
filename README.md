data base query 
create database mess
use mess
create table usertab(
	sl int PRIMARY KEY auto_increment,
    name varchar(35),
    username varchar(35),
    passwords varchar(35),
    email varchar(255),
    role varchar(35)  
)

insert into usertab (sl, name, username, passwords, email, role) values (1,'Manish','mp','123','manish@gmail.com','user');
insert into usertab (sl, name, username, passwords, email, role) values (2,'Shreya','sp','123','shreya@gmail.com','admin');
