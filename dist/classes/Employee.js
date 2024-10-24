import { pool } from '../connection.js';
class Employee {
    static async viewAllEmployees() {
        const sql = `SELECT 
            employee.id, 
            employee.first_name, 
            employee.last_name, 
            role.title, 
            department.name AS department, 
            role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee 
            JOIN role 
                ON employee.role_id = role.id
            JOIN department
                ON role.department_id = department.id
            LEFT JOIN employee AS manager
                ON employee.manager_id = manager.id`;
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                const { rows } = result;
                console.table(rows);
                resolve();
            });
        });
    }
    static async addEmployee(first_name, last_name, role_id, manager_id) {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ($1, $2, $3, $4);`;
        const params = [first_name, last_name, role_id, manager_id];
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, _result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log('User succesfully added');
                resolve();
            });
        });
    }
}
export default Employee;
