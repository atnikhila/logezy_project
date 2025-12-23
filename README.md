Technologies Used
-----------------

    Node.js

    MySQL

Project Structure
-----------------

project-root/
│── src/
│── requirements.txt
│── package.json
│── .env
│── .gitignore
│── README.md

Installation & Setup
--------------------
git clone <repository-url> # https://github.com/atnikhila/logezy_project
cd <project-folder> 

Install Required Packages
-------------------------

All required npm packages are listed in the requirements.txt file.

Database Configuration
----------------------

This project uses MySQL as the database.

Create a MySQL database locally.

Update database credentials in the .env file.

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name

JWT_SECRET=supersecretkey
ADMIN_NAME=admin
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD=Admin@123

Admin User Creation
--------------------

On application startup, an admin user is automatically created.

The admin credentials are configured in the .env file.

No manual admin setup is required.

Running the Project
-------------------

To start the application in development mode, run:

npm run dev

API Testing
-----------

A Postman collection is included in the repository.

Import the collection into Postman to test all available APIs.

Environment files (.env) and node_modules are excluded using .gitignore.

Ensure MySQL service is running before starting the application.