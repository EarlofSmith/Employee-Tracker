const fs = require('fs')
const inquirer = require('inquirer');
const db = require('./db/connections');

const startApp = () => {
    console.log(` _____  _    _  ____   _       ___   _     _  _____  _____ `)
    console.log(`|  ___|| \  / ||  _ \ | |     / _ \ \ \   / /|  ___||  ___|`)
    console.log(`| |___ |  \/  || |_| || |    | | | | \ \_/ / | |___ | |___ `)
    console.log(`|  ___||      ||  __/ | |    | | | |  \   /  |  ___||  ___|`)
    console.log(`| |    | |/\| || |    | |    | | | |   | |   | |    | |    `)
    console.log(`| |___ | |  | || |    | |___ | |_| |   | |   | |___ | |___ `)
    console.log(`|_____||_|  |_||_|    |_____| \___/    |_|   |_____||_____|`)
    console.log(` _____  ____   _____   ____  _   _  _____  ____  `)
    console.log(`|_   _||  _ \ |  _  | /  __|| | | ||  ___||  _ \ `)
    console.log(`  | |  | |_| || | | ||  /   | |/ / | |___ | |_| |`)
    console.log(`  | |  |    / | |_| || |    |   /  |  ___||    / `)
    console.log(`  | |  | |\ \ |  _  || |    |   \  | |    | |\ \ `)
    console.log(`  | |  | | | || | | ||  \__ | |\ \ | |___ | | | |`)
    console.log(`  |_|  |_| |_||_| |_| \____||_| |_||_____||_| |_|`)
    overview();
}

const overview = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would your like to do?',
            name: 'view',
            choices: ['View All Employees','View All Roles', 'View All Departments', 'View Employees by department','View Department Budgets', 'Add Role', 'Add Department', 'Add Employee', 'Update Employee Role', 'Exit']
        }

    ])
    .then(choice => {
        if (choice.view === 'View All Employees') {
            ViewAllEmployees();
        }else if (choice.view === 'View All Roles') {
            viewAllRoles(); 
        }else if (choice.view === 'View All Departments') {
            viewAllDepartments();       
        }else if (choice.view === 'View Employees by department') {
            ViewAllEmployeesByDept(); 
        }else if (choice.view ==='Add Role') {
            addRole();
        }else if (choice.view === 'Add Department' ) {
            addDepartment();
        }else if (choice.view === 'Add Employee') {
            addEmployee();
        }else if (choice.view === 'Update Employee Role') {
            updateRole();
        }else if (choice.view === 'View Department Budgets') {
            viewBudgets();
        }else if (choice.view === 'Exit') {
            process.exit();
        }
        
    })
};
const viewBudgets = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What department would you like to see the budget for?',
            name : 'budget',
            choices: departmentsArray
        }
    ]).then ((info) => {
        const budg = ` SELECT departments.department_name AS Department, SUM(roles.salary) AS Budget FROM roles INNER JOIN departments ON departments.id = roles.department_id WHERE departments.department_name = ?`
        db.query(budg, info.budget, (err, res) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log(`Viewing the budget from the ${info.budget} department`);
            console.log('');
            console.table(res);
            overview();
        })
    })
}
const ViewAllEmployeesByDept = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What department would your like to see the employee list?',
            name: 'dept_choice',
            choices: departmentsArray
        }
    ]).then((info) => {
        const deptEmployees = 'SELECT employees.employee_id, employees.first_name AS First, employees.last_name AS Last, roles.title AS Title, roles.salary AS Salary, employees.manager_id AS Manager FROM employees INNER JOIN roles On employees.role_id = roles.role_id INNER JOIN departments ON departments.id = roles.department_id WHERE departments.department_name = ?'
            db.query(deptEmployees, info.dept_choice, (err,res) =>{
                if (err) {
                    throw err
                }
                console.log('');
                console.log(`Viewing all employees from the ${info.dept_choice} department`);
                console.log('');
                console.table(res);
                overview();
            })
    })
}
const ViewAllEmployees = () => {
    const employeeList = `SELECT employees.employee_id, employees.first_name AS First, employees.last_name as Last, roles.title AS Title, departments.department_name AS Department, roles.salary, employees.manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.role_id INNER JOIN departments ON departments.id = roles.department_id;`
    db.query(employeeList, (err, res) => {
        if (err) {
            throw err
        }
        console.log('');
        console.log('Here are all the current Employees');
        console.log('');
        console.table(res);
        overview();

    })

};

const viewAllRoles = () => {
    const rolesList = `SELECT roles.role_id, roles.title, roles.salary, departments.department_name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id`
    db.query(rolesList,(err, res) => {
        if (err) {
            throw err
        }
        console.log('');
        console.log('Here are all the current roles');
        console.log('');
        console.table(res);
        overview();
    })
};

const viewAllDepartments = () => {
    const deparmentList = 'SELECT * FROM departments'
    db.query(deparmentList,(err, res) => {
        if (err) {
            throw err
        }
        console.log('');
        console.log('Here are all the current Departments');
        console.log('');
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
                    console.log('');
                    console.log('You have successfully added a new role')
                    console.log('');
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
                    console.log('');
                    console.log('You have successfully added a new employee')
                    console.log('');
                    console.table(info)
                    overview();
                })
            }) 
        })
    };
    
    const updateRole = () => {
        let sql = `SELECT employees.employee_id, employees.first_name, employees.last_name FROM employees`;

    db.query(sql, (error, response) => {
      if (error) throw error;
      let employeeNamesArray = [];
      response.forEach((employees) => {employeeNamesArray.push(`${employees.first_name} ${employees.last_name}`)});
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee would your like to update their role?',
                name: 'update_role',
                choices: employeeNamesArray,
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
                console.log(info.new_role);
                const roleID = res[0].role_id;
                console.log(roleID);
                const roleUpdate = `UPDATE employees SET employees.role_id = ? WHERE CONCAT(employees.first_name,' ', employees.last_name) = ?`
                db.query(roleUpdate, [roleID, info.update_role], (err, res) => {
                    if (err) {
                        throw err;
                    }
                    console.log('');
                    console.log('You have successfully updated a employees role');
                    console.log(`${info.update_role} role has been changed to ${info.new_role}`);
                    console.log('');
                    overview();
                })
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
                    console.log(`You have successfully created a new department called ${info.add_department}`)
                    console.log('')
                    departmentsArray.push(info.add_department)
                    overview();
                })
            })
    };

    // const employeesArray = [];
    //     const grabEmployees = `SELECT first_name FROM employees`
    //     db.query(grabEmployees, (err, res) => {
    //         if (err) {
    //             throw err
    //         }
    //         res.forEach(({first_name}) =>{
    //             employeesArray.push(first_name);
    //         });
    //     });

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


startApp();