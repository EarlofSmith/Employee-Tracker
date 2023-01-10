INSERT INTO departments
    (department_name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 4),
    ('Salesperson', 60000, 4),
    ('Lead Engineer', 180000, 1),
    ('Software Engineer', 165000, 1),
    ('Account Manager', 145000, 2),
    ('Accountant', 140000, 2),
    ('Legal Team Lead', 165000, 3),
    ('Lawyer', 140000, 3);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jack', 'Johnson', 1, 2),
    ('Brad', 'Webbs', 2, 1),
    ('Dan', 'Daman', 3, null),
    ('Sam', 'Swanson', 4, 3),
    ('Olvia', 'Sweet', 5, 3),
    ('Sara', 'Clooper', 6, 1),
    ('Mary', 'Lastragne', 7, null),
    ('Pam', 'Harrlow', 8, 7);