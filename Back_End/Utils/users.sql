-- Table structure for user's table `

CREATE TABLE users (
  id int(11) primary key NOT NULL auto_increment,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  created datetime NOT NULL
);
