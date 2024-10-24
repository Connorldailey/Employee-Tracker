import { pool } from '../connection.js';
class Role {
    static async getAllRoles() {
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
                    console.error('Error fetching roles:', err.message);
                    return reject(err);
                }
                resolve(result.rows);
            });
        });
    }
    static async viewAllRoles() {
        const rows = await this.getAllRoles();
        console.table(rows);
    }
    static async addRole(title, salary, department_id) {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES
            ($1, $2, $3)`;
        const params = [title, salary, department_id];
        return new Promise((resolve, reject) => {
            pool.query(sql, params, (err, _result) => {
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
