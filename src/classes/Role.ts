import { pool } from '../connection.js';
import { QueryResult } from 'pg';

class Role {

    static async viewAllRoles(): Promise<void> {
        const sql = `SELECT 
                role.id, 
                role.title, 
                department.name AS department, 
                role.salary
            FROM role
            JOIN department
                ON role.department_id = department.id`;
        
        return new Promise((resolve, reject) => {
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error fetching roles:', err.message);
                    return reject(err);
                }
                const { rows } = result;
                console.table(rows);
                resolve();
            });
        });
    }

    static async addRole(title: string, salary: number, department_id: number): Promise<void> {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES
            ($1), ($2), ($3)`;
        const params = [title, salary, department_id];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, _result: QueryResult) => {
                if (err) {
                    console.error('Failed to add role:', err.message);
                    return reject(err);
                }
                console.log('Role successfully added');
                resolve();
            });
        });
    }

}

export default Role;