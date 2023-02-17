INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Sales"),
       ("Legal"),
       ("Human Resources");


INSERT INTO role (title, salary, department_id)
VALUES ("Junior Software Engineer", 100000, 001),
       ("Senior Software Engineer", 200000, 001),
       ("Finance Manager", 200000, 002),
       ("Accountant", 150000, 002),
       ("Finance Clerk", 50000, 002),
       ("Sales Manager", 300000, 003),
       ("Lawyer", 300000, 004),
       ("Human Resources Manager", 150000, 005),
       ("Recruiter", 60000, 005);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 	("Terianne", "Phillips", 002, NULL),
		("Hadley", "Phillips", 002, 001),
        ("Cory", "Weckwerth", 003, NULL),
        ("Molly", "Catt", 004, 003),
        ("Tahli", "Catt", 008, NULL);