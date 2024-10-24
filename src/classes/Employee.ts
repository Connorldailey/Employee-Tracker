import { pool } from '../connection.js';
import { QueryResult } from 'pg';

class Employee {

    static async getAllEmployees(): Promise<any[]> {
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
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error fetching employees:', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            });
        });
    }

    static async addEmployee(first_name: string, last_name: string, role_id: number, manager_id?: number | null): Promise<void> {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ($1, $2, $3, $4);`
        const params = [first_name, last_name, role_id, manager_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, _result: QueryResult) => {
                if (err) {
                    console.error('Failed to add employee:', err.message);
                    return reject(err);
                }
                console.log('Employee succesfully added');
                resolve();
            });
        });
    }

}

export default Employee;