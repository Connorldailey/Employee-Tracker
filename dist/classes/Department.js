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
    static async deleteDepartment(department_id) {
        const sql = `DELETE FROM department WHERE id = $1`;
        const params = [department_id];
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, _result) => {
                if (err) {
                    console.error('Failed to delete department', err.message);
                    return reject(err);
                }
                console.log('Department successfully deleted');
                resolve();
            });
        });
    }
}
export default Department;
