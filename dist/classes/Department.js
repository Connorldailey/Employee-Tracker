import { pool } from '../connection.js';
class Department {
    static async viewAllDepartments() {
        const sql = `SELECT id, name FROM department`;
        return new Promise((resolve, reject) => {
            pool.query(sql, (err, result) => {
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
    static async addDepartment(department) {
        const sql = `INSERT INTO department (name) VALUES ($1)`;
        const params = [department];
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, _result) => {
                if (err) {
                    console.error('Error adding department:', err.message);
                    return reject(err);
                }
                console.log('Department successfully added');
                resolve();
            });
        });
    }
}
export default Department;
