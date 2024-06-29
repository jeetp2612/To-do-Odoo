# Todo List Application with Login and Signup Functionality

This is a feature-rich web application for managing a todo list. The application allows users to create and manage tasks with ease, helping them stay organized and focused on their goals. The application includes a **login and signup functionality** for users, with different roles (admin, super admin, and user) and dashboards based on the user's login status.

## Features

- Create, update, and delete tasks
- Mark tasks as complete or incomplete
- View completed tasks and filter tasks by status (all, active, or completed)
- Clear completed tasks
- **Login and signup functionality** for users, with different roles (admin, super admin, and user) and dashboards based on the user's login status
- Store tasks in a MySQL database for persistent storage
- Responsive design that works on desktop and mobile devices

## Technologies Used

- HTML, CSS, and JavaScript for the front-end
- Bootstrap for responsive design
- Node.js and Express for the back-end
- MySQL database for storing the database
- Passport.js for authentication and authorization
- Git for version control
- Heroku for hosting

## Installation and Usage

1. Clone the repository:

```git
git clone https://github.com/onkar-birajdar/todo-list.git
```
2. Install the dependencies of client: 

```git
npm install
```
4. Start client:

```javascript
npm start
```
5. Open the application in your web browser:

```url
http://localhost:3000
```

6. Install the dependencies of server: 

```git
npm install
```
7. Replace the database credentials with your own:

8. Start the server: 

```npm
nodemon server.js
```


## How to Use

If you don't have an account, click the "Sign Up" button to create a new account. If you already have an account, click the "Log In" button to log in to your account. Once logged in, you can create tasks by typing in the input field and hitting enter or clicking the "Add" button. To mark a task as complete, click the checkbox next to it. To edit or delete a task, hover over the task and click the corresponding button. You can also filter tasks by status using the buttons at the bottom of the list.

## Contribution Guidelines

This project is open-source and contributions are welcome! If you would like to contribute, please fork the repository and create a pull request with your changes. Make sure to follow the code style and testing guidelines outlined in the CONTRIBUTING.md file.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as you see fit.
