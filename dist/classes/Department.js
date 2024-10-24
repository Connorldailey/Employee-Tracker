import { pool } from '../connection.js';
class Department {
    static async getAllDepartments() {
        const sql = `SELECT id, name FROM department`;
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, result) => {
                if (err) {
                    console.error('Error fetching departments:', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            });
        });
    }
    static async viewAllDepartments() {
        const rows = await this.getAllDepartments();
        console.table(rows);
    }
    static async addDepartment(department) {
        const sql = `INSERT INTO department (name) VALUES ($1)`;
        const params = [department];
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, _result) => {
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
