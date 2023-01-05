DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL,
  department_name VARCHAR (30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT,
  title VARCHAR (30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
--   PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    PRIMARY KEY (id)
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);