import { pool } from '../connection.js';
class Role {
    static async viewAllRoles() {
        const sql = `SELECT 
                role.id, 
                role.title, 
                department.name AS department, 
                role.salary
            FROM role
            JOIN department
                ON role.department_id = department.id`;
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
export default Role;
