1. User Management API (Node.js + MySQL)

    A structured User Management System built using Node.js, Express, Sequelize ORM, MySQL, JWT authentication.

    Features

    User Registration & Login (JWT Authentication)

    Password hashing using bcrypt

    JWT token expiry (1 hour)

    Role-based access control (Admin / User)

    Soft delete users

    Fetch logged-in user profile (/users/me)

    User CRUD operations

2. CSV Import/ export
----------------------
    The Import & Export module allows admin users to bulk upload and download customer data in CSV format.
    Access to these APIs is restricted using role-based authorization, ensuring only users with the ADMIN role can perform import and export operations.

    Import: Admin can upload a CSV file to bulk-create users. Data is validated, duplicates are skipped before saving to the database.

    Export: Admin can download all customer records as a CSV file.

    
