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
                    'View Employees By Manager',
                    'View Employees By Department',
                    'Add Employee',
                    'Delete Employee',
                    'Update Employee Role',
                    'Update Employee Manager',
                    'View All Roles',
                    'Add Role',
                    'Delete Role',
                    'View All Departments',
                    'Add Department',
                    'Delete Department',
                    'Exit'
                ]
            }
        ]);
        switch (action) {
            case 'View All Employees':
                const employees = await Employee.getAllEmployees();
                console.table(employees);
                break;
            case 'View Employees By Manager':
                await this.viewEmployeesByManager();
                break;
            case 'View Employees By Department':
                await this.viewEmployeesByDepartment();
                break;
            case 'Add Employee':
                await this.addEmployee();
                break;
            case 'Delete Employee':
                await this.deleteEmployee();
                break;
            case 'Update Employee Role':
                await this.updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                await this.updateEmployeeManager();
                break;
            case 'View All Roles':
                const roles = await Role.getAllRoles();
                console.table(roles);
                break;
            case 'Add Role':
                await this.addRole();
                break;
            case 'Delete Role':
                await this.deleteRole();
                break;
            case 'View All Departments':
                const departments = await Department.getAllDepartments();
                console.table(departments);
                break;
            case 'Add Department':
                await this.addDepartment();
                break;
            case 'Delete Department':
                await this.deleteDepartment();
                break;
            default:
                process.exit(0);
        }
        // Restart the Cli after the action is complete
        return this.startCli();
    }
    async viewEmployeesByManager() {
        const managers = await Employee.getUniqueManagers();
        const { manager_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select a manager to view their employees',
                choices: managers.map(manager => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id,
                }))
            }
        ]);
        const employeesByManager = await Employee.getEmployeesByManager(manager_id);
        console.table(employeesByManager);
    }
    async viewEmployeesByDepartment() {
        const departments = await Department.getAllDepartments();
        const { department_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Select a department to view its employees',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id,
                }))
            }
        ]);
        const employeesByDepartment = await Employee.getEmployeesByDepartment(department_id);
        console.table(employeesByDepartment);
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
    async deleteEmployee() {
        const employees = await Employee.getAllEmployees();
        const { employee_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: 'Select an employee to delete',
                choices: employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                }))
            }
        ]);
        await Employee.deleteEmployee(employee_id);
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
    async updateEmployeeManager() {
        const employees = await Employee.getAllEmployees();
        const { employee_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee_id',
                message: "Which employee's manager would you like to update?",
                choices: employees.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                }))
            }
        ]);
        const { manager_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: "Which manager do you want to assign the selected employee?",
                choices: [
                    { name: 'None', value: null },
                    ...employees.filter(employee => employee.id !== employee_id).map(employee => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }))
                ]
            }
        ]);
        await Employee.updateEmployeeManager(employee_id, manager_id);
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
    async deleteRole() {
        const roles = await Role.getAllRoles();
        const { role_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'role_id',
                message: 'Select a role to delete',
                choices: roles.map(role => ({
                    name: role.title,
                    value: role.id,
                }))
            }
        ]);
        await Role.deleteRole(role_id);
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
    async deleteDepartment() {
        const departments = await Department.getAllDepartments();
        const { department_id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'department_id',
                message: 'Select a department to delete',
                choices: departments.map(department => ({
                    name: department.name,
                    value: department.id,
                }))
            }
        ]);
        await Department.deleteDepartment(department_id);
    }
}
export default Cli;
