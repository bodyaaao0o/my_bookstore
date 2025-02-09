Project Description.

This project implements an online bookstore and user authentication and authorization system using JWT (JSON Web Token) in Spring Boot. The API allows you to register users, get an access token, and protect routes with authentication.

Main features

User registration

Authorization with JWT token receipt

Secure API endpoints available only to authenticated users

JWT token validation

Using Spring Security to protect requests

Selecting specific books for purchase (with filtering in the form of queries)

All books are stored in the database

Adding books to the cart and adjusting the quantity

Registration for delivery 

Technologies

Java 22

Spring Boot

Spring Security

JWT (JSON Web Token)

BCrypt for password hashing

Maven

Get it up and running

Clone the repository:

git clone https://github.com/your-username/your-repo.git
cd your-repo

Configure the database (if necessary) and specify the connection parameters in application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/db_name
spring.datasource.username=root
spring.datasource.password=your_password

Run the application:

mvn spring-boot:run

Using the API

1. Registering a user

POST /api/register

Request body:

{
  “username": “user123”,
  “password": “password123”
}

2. Authorization (receiving a token)

POST /api/login

Request body:

{
  “username": “user123”,
  “password": “password123”
}

Response:

{
  “token": “your_jwt_token_here”
}

3. Access to protected resources

GET /api/protected

Header:

Authorization: Bearer your_jwt_token_here

License.

This project is distributed under the MIT License.
