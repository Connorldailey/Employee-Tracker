import inquirer from 'inquirer';

class Cli {
    startCli(): void {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'What would you like to do?',
                    choices: [
                        'View All Employees',
                        'Add Employee',
                        'Update Employee Role',
                        'View All Roles',
                        'Add Role',
                        'View All Departments',
                        'Add Department',
                        'Exit'
                    ]
                }
            ])
            .then((res) => {
                switch (res.action) {
                    case 'View All Employees':
                        break;
                    case 'Add Employee':
                        break;
                    case 'Update Employee Role':
                        break;
                    case 'View All Roles':
                        break;
                    case 'Add Role':
                        break;
                    case 'View All Departments':
                        break;
                    case 'Add Department':
                        break;    
                    default:
                        process.exit(0);
                }
            });
    }
}

export default Cli;