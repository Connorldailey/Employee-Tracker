import inquirer from 'inquirer';
import Department from './Department.js';
import Role from './Role.js';
import Employee from './Employee.js';

class Cli {
    async startCli(): Promise<void> {
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
                await Role.viewAllRoles();
                break;
            case 'Add Role':
                await this.addRole();
                break;
            case 'View All Departments':
                await Department.viewAllDepartments();
                break;
            case 'Add Department':
                await this.addDepartment();
                break;    
            default:
                process.exit(0);
        }
        // Restart the Cli after the action is complete
        this.startCli();
    }

    async addEmployee(): Promise<void> {
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
                message: "Enter the employee's role",
            }
        ]);
    }

    async addRole(): Promise<void> {
        const departments = await Department.getAllDepartments();
    
        const { title, salary, department_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for this role',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select the department for this role',
                choices: departments.map(dept => ({ name: dept.name, value: dept.id })),
            }
        ]);
        await Role.addRole(title, salary, department_id);
    }

    async addDepartment(): Promise<void> {
        const { department } = await inquirer.prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Enter the name of the department',
            }
        ]);
        await Department.addDepartment(department);
    }
}

export default Cli;