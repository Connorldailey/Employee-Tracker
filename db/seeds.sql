-- Pre-populate department table
INSERT INTO department (name) VALUES 
    ('Engineering'),
    ('Human Resources'),
    ('Marketing'),
    ('Finance');
-- Pre-populate role table
INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 80000, 1),  -- Engineering Department
    ('HR Manager', 75000, 2),         -- Human Resources Department
    ('Marketing Specialist', 60000, 3), -- Marketing Department
    ('Financial Analyst', 70000, 4),  -- Finance Department
    ('DevOps Engineer', 85000, 1),    -- Engineering Department
    ('Recruiter', 65000, 2);          -- Human Resources Department
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Alice', 'Smith', 1, NULL),  -- Software Engineer, No Manager
    ('Bob', 'Johnson', 2, NULL),  -- HR Manager, No Manager
    ('Charlie', 'Brown', 3, NULL), -- Marketing Specialist, No Manager
    ('Diana', 'Prince', 4, NULL), -- Financial Analyst, No Manager
    ('Eve', 'White', 5, 1),       -- DevOps Engineer, Alice is Manager
    ('Frank', 'Black', 6, 2);     -- Recruiter, Bob is Manager