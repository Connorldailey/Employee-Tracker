import { pool } from '../connection.js';
import { QueryResult } from 'pg';

class Department {

    static async viewAllDepartments(): Promise<void> {
        const sql = `SELECT id, name FROM department`;

        return new Promise((resolve, reject) => {
            pool.query(sql, (err: Error, result: QueryResult) => {
                if (err) {
                    console.error('Error fetching deprtments:', err.message);
                    return reject(err);
                }
                const { rows } = result;
                console.table(rows);
                resolve();
            });
        });
    }

    static async addDepartment(department: string): Promise<void> {
        const sql = `INSERT INTO department (name) VALUES ($1)`;
        const params = [department];

        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err: Error, _result: QueryResult) => {
                if (err) {
                    console.error('Failed to add department:', err.message);
                    return reject(err);
                }
                console.log('Department successfully added');
                resolve();
            });
        });
    }

}

export default Department;