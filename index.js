// TODO: Include packages needed for this application
const fs = require("fs");
const path = require("path")
const inquirer  = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "please name your project",
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the instructions for installation?',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please provide instructions for installation to ensure users have the proper software to run your program!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('you should enter a username so others can find your github accouont');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'tests', 
        message: 'What command should be run to run tests?',
        default: 'npm test'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How do you use this app?',
            validate: nameInput => {
            if (nameInput) {
            return true;
        } else {
            console.log('Please enter a usage description!');
            return false; 
        }
    }
},
    {
        type: "input",
        name: "description",
        message: "describe the purpose of this project",
    },
    {
        type: "input",
        name: "name",
        message: "What is your full name?",
    },
    {
        type: "input",
        name: "email",
        message: "please add contact information",
    },
    {
        type: 'list',
        name: 'licenses',
        message: 'What license would you like to include?',
        choices: ['MIT', 'GPL', 'CC--0'],
        when: ({ confirmLicenses }) => {
            if (confirmLicenses) {
                return true;
            } else {
                return false;
            }
        }
    },
];

//this is going to write readme file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data)
}
// This function is going to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((response) =>
        writeToFile('./dist/Readme.md', generateMarkdown(response))
    );
}

// Function call to initialize app
init();
