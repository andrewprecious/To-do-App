

# Project Title

### To-Do App
# Description
 The app allows users to create tasks by providing a title offering flexibility in organizing tasks according to individual preferences. Once a task is completed, users can mark it as done by clicking the checkbox, and they also have the option to delete tasks once finished. Additionally, tasks can be edited or updated as needed, ensuring they remain up-to-date and relevant. The app is designed for simplicity, with a lightweight interface that’s easy to navigate, making it ideal for users looking to stay focused and productive without unnecessary distractions.

Users can view their tasks in a list format and manage them with ease.This app ensures that no task is overlooked, helping users effectively manage their time and stay on top of their goals.

# Dependencies

#### Before installing and running the To-Do app backend, ensure that your system meets the following prerequisites:


## Operating System:

* Windows 10 or later, macOS, or Linux (should work on any OS with Node.js support)

## Prerequisites:
* Node.js (version 14.x or higher)
* Install React.js
* npm (Node Package Manager) comes bundled with Node.js, so installing Node.js will also install npm.

## Libraries/Frameworks:

* Express: Web framework for Node.js, used to build the server and handle API requests.
* Mongoose: Object Data Modeling (ODM) library for MongoDB, used to interact with your database.
* cors: Middleware for enabling Cross-Origin Resource Sharing (CORS), allowing your app to access resources from different origins.
* crypto-js: A library used for hashing and encryption of sensitive data.
* dotenv: Loads environment variables from a .env file to configure your app securely.
* jsonwebtoken: A library used for implementing JSON Web Tokens (JWT) authentication.
* nodemailer: Used for sending emails (e.g., email verification or notifications).
* validator: A library for validating and sanitizing input data.
* ejs: Template engine used for rendering HTML views on the server-side.

## Development Tools:

* Code Editor: Visual Studio Code.

# Installing
Follow the steps below to install and run the To-Do app locally on your system.

### 1. Clone the repository
First, clone the repository to your local machine using Git. Run the following command in your terminal:

```
git clone https://github.com/andrewprecious/to-do app

```

### 2. Navigate to the project directory
Change into the project folder:

```
cd to-do app
```

### 3. Install dependencies

Install the required Node.js dependencies for both the frontend and backend by running:

```
npm install
```
This will install all dependencies listed in the package.json file.

### 4. Set up environment variables
If your app uses environment variables make sure to create a .env file in the root directory.

Here is an example of what the .env file might look like:

```
DB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 5. Run the application
Once the dependencies are installed and the environment variables are configured, you can run the backend server:

```
npm start
```
This will start the server on http://localhost:3000 

### 6. Access the application
You can access the app by navigating to http://localhost:3000 in your web browser.

# Executing program

The following steps are the steps for executing the todo app

### 1. Backend-logic: 

* I used Node.js to handle the backend logic of the web app including processing requests, managing data and interacting with databases
 
### 2. Frontend-logic:

* I used React.js in frontend, which handles rendering the user interface processing data on the client-side and sending requests to the backend

### 3. Communication Between the Backend and the Frontend: 

* The frontend(React.js) communicates with the backend(Node.js) using API to send requests and recieve data

# Help

If you need any help or encounter any issues please kindly send a message to this email ("andrewprecious161@gmail.com")



