INSERT INTO department (id, name)
VALUES (001, "Engineering"),
       (002, "Finance"),
       (003, "Sales"),
       (004, "Legal"),
       (005, "Human Resources");


INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Junior Software Engineer", 100000, 001),
       (002, "Senior Software Engineer", 200000, 001),
       (003, "Finance Manager", 200000, 002),
       (004, "Accountant", 150000, 002),
       (005, "Finance Clerk", 50000, 002),
       (006, "Sales Manager", 300000, 003),
       (007, "Lawyer", 300000, 004),
       (008, "Human Resources Manager", 150000, 005),
       (009, "Recruiter", 60000, 005);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 	(001, "Terianne", "Phillips", 002, NULL),
		(002, "Hadley", "Phillips", 002, 001),
        (003, "Cory", "Weckwerth", 003, NULL),
        (004, "Molly", "Catt", 004, 003),
        (005, "Tahli", "Catt", 008, NULL);