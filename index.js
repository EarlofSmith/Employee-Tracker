const fs = require('fs')
const inquirer = require('inquirer');

const overview = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would your like to do?',
            name: 'view',
            choices: ['View All Employes', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }

    ])
    .then(choice => {
        if (choice.view === 'View All Employes') {
            // link employes from database
        }else if (choice.view === 'Add Employee') {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'Enter Employee Name: ',
                    name: 'employee_name'
                }
            ])
            .then(response => {
                // add new employee to the database
            })
        }else if (choice.view === 'Update Employee Role') {
            inquirer.prompt([
                {
                    type: 'input',
                    message: '',
                    name: 'update_role'
                }
            ])
        }else if (choice.view === 'View All Roles') {
            // grad roles from database
        }else if (choice.view ==='Add Role') {
            addRole();
        }else if (choice.view === 'View All Departments') {
            // link departments from database
        }else if (choice.view === 'Add Department' ) {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the Department you would like to add?',
                    name: 'add_department'
                }
            ])
        }
    })
};

const ViewAllEmployees = () => {

}

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
                    choices: [],
                }
              
        ])
    };

overview();