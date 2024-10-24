import inquirer from 'inquirer';
import Employee from './Employee.js';
import Department from './Department.js';
class Cli {
    async startCli() {
        const { action } = await inquirer.prompt([
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
        ]);
        switch (action) {
            case 'View All Employees':
                await Employee.viewAllEmployees();
                break;
            case 'Add Employee':
                this.addEmployee();
                break;
            case 'Update Employee Role':
                break;
            case 'View All Roles':
                break;
            case 'Add Role':
                break;
            case 'View All Departments':
                await Department.viewAllDepartments();
                break;
            case 'Add Department':
                break;
            default:
                process.exit(0);
        }
        // Restart the Cli after the action is complete
        this.startCli();
    }
    async addEmployee() {
        await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Enter the employee's first name",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "Enter the employee's last name",
            },
            {
                type: 'input',
                name: 'role',
                message: "Enter the employee's role"
            }
        ]);
    }
}
export default Cli;
