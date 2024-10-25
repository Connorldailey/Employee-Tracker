\c employee_db

-- View all departments
SELECT id, name FROM department;

-- View all roles
SELECT 
    role.id, 
    role.title, 
    department.name AS department, 
    role.salary
FROM role
JOIN department
    ON role.department_id = department.id;

-- View all employees
SELECT 
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
    ON employee.manager_id = manager.id;

-- View Employees By Manager
SELECT
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
    ON employee.manager_id = manager.id
WHERE employee.manager_id = $1
ORDER BY employee.last_name;

--Retrieve managers
SELECT DISTINCT
    manager.id,
    manager.first_name,
    manager.last_name
FROM employee
JOIN employee AS manager
    ON employee.manager_id = manager.id
ORDER BY manager.last_name;

-- View Employees By Department
SELECT
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
    ON employee.manager_id = manager.id
WHERE role.department_id = $1
ORDER BY employee.last_name;

-- View total utilized budget of a department
SELECT 
    department.name AS department,
    SUM(role.salary) AS utilized_budget
FROM department
JOIN role
    ON role.department_id = department.id
GROUP BY department.name;
