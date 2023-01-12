INSERT INTO departments
    (department_name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

INSERT INTO roles
    (role_id, title, salary, department_id)
VALUES
    (1, 'Sales Lead', 100000, 4),
    (2, 'Salesperson', 60000, 4),
    (3, 'Lead Engineer', 180000, 1),
    (4, 'Software Engineer', 165000, 1),
    (5, 'Account Manager', 145000, 2),
    (6, 'Accountant', 140000, 2),
    (7, 'Legal Team Lead', 165000, 3),
    (8, 'Lawyer', 140000, 3);

INSERT INTO employees
    (employee_id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'Jack', 'Johnson', 1, 2),
    (2, 'Brad', 'Webbs', 2, 1),
    (3, 'Dan', 'Daman', 3, null),
    (4, 'Sam', 'Swanson', 4, 3),
    (5, 'Olvia', 'Sweet', 5, 3),
    (6,'Sara', 'Clooper', 6, 1),
    (7,'Mary', 'Lastragne', 7, null),
    (8, 'Pam', 'Harrlow', 8, 7);