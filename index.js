const inquirer = require('inquirer');

function overview() {
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
                    name: 'employee-name'
                }
            ])
            .then(response => {
                // add new employee to the database
            })
        }
    })
};