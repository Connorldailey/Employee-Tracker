import { pool } from '../connection.js';
import { QueryResult } from 'pg';

class Department {
    static async viewAllDepartments(): Promise<void> {
        const sql = `SELECT id, name FROM department`;

        return new Promise((resolve, reject) => {
            pool.query(sql, (err: Error, result: QueryResult) => {
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
}

export default Department;