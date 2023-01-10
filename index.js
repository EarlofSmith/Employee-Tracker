const fs = require('fs')
const inquirer = require('inquirer');
const db = require('./db/connections');

const overview = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would your like to do?',
            name: 'view',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }

    ])
    .then(choice => {
        if (choice.view === 'View All Employees') {
            ViewAllEmployees();
        }else if (choice.view === 'Add Employee') {
            addEmployee();
        }else if (choice.view === 'Update Employee Role') {
            updateRole();
        }else if (choice.view === 'View All Roles') {
            viewAllRoles();
        }else if (choice.view ==='Add Role') {
            addRole();
        }else if (choice.view === 'View All Departments') {
            // link departments from database
        }else if (choice.view === 'Add Department' ) {
            addDepartment();
        }
    })
};

const ViewAllEmployees = () => {
    const employeeList = `SELECT * FROM employees`
    db.query(employeeList, (err, res) => {
        if (err) {
            throw err
        }
        console.log('All Employees');
        console.log('');
        console.table(res);
        console.log('=====================================');
        overview();

    })

};

const viewAllRoles = () => {
    const rolesList = `SELECT * FROM roles`
    db.query(rolesList,(err, res) => {
        if (err) {
            throw err
        }
        console.log('All Roles');
        console.log('');
        console.table(res);
        console.log('=====================================');
        overview();
    })
}
const addRole = () => {
    const deparmentList = 'SELECT departments.department_name AS Department'
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
                    choices: [deparmentList],
                    // add choices from database
                }
              
        ]).then ((choice) => {
            console.log(choice);
            overview();
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
                type: 'input',
                message: 'What is the role ID number of the employee you would you like to add?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'What is the manager ID number of the employee you would you like to add?',
                name: 'manager'
            }
        ])
    };
    
    const updateRole = () => {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employees role would your like to update?',
                name: 'update_role',
                choices: '',
                // add choices from database
            },
            {
                type: 'list',
                message: 'What new role would you like to assign to the employee?',
                name: 'new_role',
                choices: '',
                // add choices from database
            }
        ])
    };
    
    const addDepartment = () => {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the Department you would like to add?',
                    name: 'add_department'
                }
            ])
    }

overview();