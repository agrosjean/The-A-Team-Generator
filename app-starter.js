const Manager = require("./classes/manager");
const Engineer = require("./classes/engineer");
const Intern = require("./classes/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
let lastId = 0;
const getUniqueId = () => ++lastId;
const idArray = [];

function appMenu() {

    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                message: "What is your team manager's name?",
                name: "name"
            },
            {
                message: "What is your team manager's email address?",
                name: "email"
            },

            {
                type: "number",
                message: "What is your team manager's office number?",
                name: "officeNumber"
            },
        ]).then(answers => {
            const manager = new Manager(answers.name, getUniqueId(), answers.email, answers.officeNumber);
            teamMembers.push(manager);
            idArray.push(manager.id);
            createTeam();
        });
    }

    function createTeam() {

        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                message: "What is your team Engineer's name?",
                name: "name"
            },
            {
                message: "What is your team Engineer's email address?",
                name: "email"
            },

            {
                type: "number",
                message: "What is your team Engineer's Github profile link?",
                name: "githubProfile"
            },
        ]).then(answers => {
            const engineer = new Engineer(answers.name, getUniqueId(), answers.email, answers.githubProfile);
            teamMembers.push(engineer);
            idArray.push(engineer.id);

            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                message: "What is your team Intern's name?",
                name: "name"
            },
            {
                message: "What is your team Intern's email address?",
                name: "email"
            },

            {
                type: "number",
                message: "What is your team Intern's school?",
                name: "school"
            },
        ]).then(answers => {

            const intern = new Intern(answers.name, getUniqueId(), answers.email, answers.school);
            teamMembers.push(intern);
            idArray.push(intern.id);

            createTeam();
        });
    }

    function buildTeam() {
        // Create the output directory if the output path doesn't exist
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();

}


appMenu();