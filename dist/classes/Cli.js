import inquirer from 'inquirer';
import Department from './Department.js';
import Role from './Role.js';
import Employee from './Employee.js';
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
                const employees = await Employee.getAllEmployees();
                console.table(employees);
                break;
            case 'Add Employee':
                await this.addEmployee();
                break;
            case 'Update Employee Role':
                await this.updateEmployeeRole();
                break;
            case 'View All Roles':
                const roles = await Role.getAllRoles();
                console.table(roles);
                break;
            case 'Add Role':
                await this.addRole();
                break;
            case 'View All Departments':
                const departments = await Department.getAllDepartments();
                console.table(departments);
                break;
            case 'Add Department':
                await this.addDepartment();
                break;
            default:
                process.exit(0);
        }
        // Restart the Cli after the action is complete
        return this.startCli();
    }
    async addEmployee() {
        const roles = await Role.getAllRoles();
        const employees = await Employee.getAllEmployees();
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
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
                type: 'list',
                name: 'role_id',
                message: "Enter the employee's role",
                choices: roles.map(role => ({ name: role.title, value: role.id })),
            },
            {
                type: 'list',
                name: 'manager_id',
                message: "Enter the employee's manager",
                choices: [
                    { name: 'None', value: null },
                    ...employees.map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    }))
                ],
            }
        ]);
        await Employee.addEmployee(first_name, last_name, role_id, manager_id);
    }
    async updateEmployeeRole() {
        const employees = await Employee.getAllEmployees();
        const roles = await Role.getAllRoles();
        const { employee_id, role_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: "Which employee's role do you want to update?",
                choices: employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                }))
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Which role do you want to assign the selected employee?',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id,
                }))
            }
        ]);
        await Employee.updateEmployeeRole(employee_id, role_id);
    }
    async addRole() {
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
    async addDepartment() {
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
