const fs = require('fs')
const inquirer = require('inquirer');
const db = require('./db/connections');

const overview = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would your like to do?',
            name: 'view',
            choices: ['View All Employees','View All Roles', 'View All Departments',  'Add Role', 'Add Department', 'Add Employee', 'Update Employee Role', 'Exit']
        }

    ])
    .then(choice => {
        if (choice.view === 'View All Employees') {
            ViewAllEmployees();
        }else if (choice.view === 'View All Roles') {
            viewAllRoles(); 
        }else if (choice.view === 'View All Departments') {
            viewAllDepartments();       
        }else if (choice.view ==='Add Role') {
            addRole();
        }else if (choice.view === 'Add Department' ) {
            addDepartment();
        }else if (choice.view === 'Add Employee') {
            addEmployee();
        }else if (choice.view === 'Update Employee Role') {
            updateRole();
        }else if (choice.view === 'Exit') {
            // exit();
        }
        
    })
};

const ViewAllEmployees = () => {
    const employeeList = `SELECT * FROM employees INNER JOIN roles ON employees.role_id = roles.role_id INNER JOIN departments ON departments.id = roles.department_id;`
    db.query(employeeList, (err, res) => {
        if (err) {
            throw err
        }
        console.log('Here are all the current Employees');
        console.log('');
        console.table(res);
        console.log('=====================================');
        overview();

    })

};

const viewAllRoles = () => {
    const rolesList = `SELECT * FROM roles LEFT JOIN departments on roles.department_id = departments.id`
    db.query(rolesList,(err, res) => {
        if (err) {
            throw err
        }
        console.log('Here are all the current roles');
        console.log('');
        console.table(res);
        console.log('=====================================');
        overview();
    })
};

const viewAllDepartments = () => {
    const deparmentList = 'SELECT * FROM departments'
    db.query(deparmentList,(err, res) => {
        if (err) {
            throw err
        }
        console.log('Here are all the current Departments');
        console.table(res);
        overview();
    })
};

const addRole = () => {
        inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role you would like to add?',
                    name: 'add_role',
                    validate: add_role => {
                        if (add_role) {
                            return true;
                        } else {
                            return 'Please enter role.';
                        }
                    }
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'add_salary',
                },
                {
                    
                    type: 'list',
                    message: 'To what department will you like to add this role?',
                    name: 'addRoleDepartment',
                    choices: departmentsArray,
                }
              
        ]).then ((info) => {
            const dpartmentID = 'SELECT id FROM departments WHERE department_name = ?'
            db.query(dpartmentID, info.addRoleDepartment, (err,res) =>{
                if (err) {
                    throw err
                }
                const idDepartment = res[0].id
                const newRole= 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)'
                 db.query(newRole, [info.add_role, info.add_salary, idDepartment], (err)=>{
                    if (err) {
                        throw err;
                    }
                    rolesArray.push(info.add_role)
                    console.log('You have successfully added a new role')
                    console.table(info);
                    overview();
                })
            })
            })
            
       
    };

    const addEmployee = () => {
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the first name of the employee you would you like to add?',
                name: 'first_name'
            },
            {
                type: 'input',
                message: 'What is the last name of the employee you would you like to add?',
                name: 'last_name'
            },
            {
                type: 'list',
                message: 'What is the role of the employee you would you like to add?',
                choices: rolesArray,
                name: 'role'
            },
            {
                type: 'input',
                message: 'What is the manager ID number of the employee you would you like to add?',
                name: 'manager'
            }
        ]).then((info) => {
            const rolechoice = 'SELECT role_id FROM roles WHERE title = ?'
            db.query(rolechoice, info.role,(err,res) =>{
                if (err) {
                    throw err;
                }
                const rID = res[0].role_id;
                const newEmployee = `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
                db.query(newEmployee,[info.first_name, info.last_name, rID, info.manager], (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('You have successfully added a new employee')
                    console.table(info)
                    employeesArray.push(info.first_name)
                    overview();
                })
            }) 
        })
    };
    
    const updateRole = () => {
        
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee would your like to update their role?',
                name: 'update_role',
                choices: employeesArray,
            },
            {
                type: 'list',
                message: 'What new role would you like to assign to the employee?',
                name: 'new_role',
                choices: rolesArray,
            }
        ]).then((info)=>{
            const idUpdated = `SELECT role_id FROM roles WHERE title = ?`
            db.query(idUpdated, info.new_role,(err,res) =>{
                if (err) {
                    throw err;
                }
                const roleID = res[0].role_id;
                const roleUpdate = `UPDATE employees SET role_id = ? WHERE first_name = ?`
                db.query(roleUpdate, [roleID, info.update_role], (err, res) => {
                    if (err) {
                        throw err;
                    }
                    console.log('')
                    console.log('You have successfully updated a employees role')
                    console.log(`${info.update_role} role has been changed to ${info.new_role}`)
                    console.log()
                    overview();
                })
            })
        })
    };
    
    const addDepartment = () => {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the Department you would like to add?',
                    name: 'add_department'
                }
            ]).then((info) => {
                const newDepartment = `INSERT INTO departments (department_name) VALUES (?)`
                db.query(newDepartment, info.add_department, (err) => {
                    if (err) {
                        throw err
                    }
                    console.log('')
                    console.log('You have successfully created a new department')
                    console.log(`The department ${info.add_department} has been added`)
                    console.log('')
                    departmentsArray.push(info.add_department)
                    overview();
                })
            })
    };

    const employeesArray = [];
        const grabEmployees = 'SELECT first_name FROM employees'
        db.query(grabEmployees, (err, res) => {
            if (err) {
                throw err
            }
            res.forEach(({first_name}) =>{
                employeesArray.push(first_name);
            });
        });

        const rolesArray = [];
        const grabroles = 'SELECT title FROM roles'
        db.query(grabroles, (err, res) => {
            if (err) {
                throw err
            }
            res.forEach(({title}) =>{
                rolesArray.push(title);
            });
        });

        const departmentsArray = [];
        const grabdepartments = 'SELECT department_name FROM departments'
        db.query(grabdepartments, (err, res) => {
            if (err) {
                throw err
            }
            res.forEach(({department_name}) =>{
                departmentsArray.push(department_name);
            });
        });


overview();