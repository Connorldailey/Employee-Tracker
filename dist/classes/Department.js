import { pool } from '../connection.js';
class Department {
    static async viewAllDepartments() {
        const sql = `SELECT id, name FROM department`;
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
}
export default Department;
