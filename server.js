//Dependencies found here
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Morpheus718",
  database: "employee_info_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  startScreen();
  //  connection.end();//
});

//What the user will first see once logged into node
function startScreen() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then(function(result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          quit();
      }
    });
}


//All of the corresponding functions found below

function addDepartment() {


    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function(answer){



        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
    })
    })
}


function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ])
    .then(function(answer) {


      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "eeFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "eeLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function(answer) {

      
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

//Since we're using inquirer, we can pass the query into the method as an array

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "eeUpdate"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function(answer) {
      // let query = `INSERT INTO department (name) VALUES ("${answer.deptName}")`
      //let query = `'UPDATE employee SET role_id=${answer.updateRole} WHERE first_name= ${answer.eeUpdate}`;
      //console.log(query);

      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.eeUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        startScreen();
      });
    });
}

function viewDepartment() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

function viewEmployees() {
  // select from the db
  let query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

function quit() {
  connection.end();
  process.exit();
}