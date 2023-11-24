const reader = require("readline-sync");

const data = [];
let password = [];
let balance = 0;
let statement = [];
position = 0;

function submenu() {

    console.log("\n");
    console.log("Welcome to SENAC Bank!");
    console.log("1 - Provide customer registration data");
    console.log("2 - Provide customer password");
    console.log("0 - Exit");

    let option = reader.questionInt("Enter the desired option: ");

    switch (option) {

        case 1:
            provideData();
            break;
        case 2:
            providePassword();
            break;
        case 0:
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid option");
            setTimeout(() => {
                menu();
            }, 500);
    }
}

function provideData() {

    let dataResponse = reader.question("Provide your data: [Y or N]");
    if (dataResponse === 'Y') {
        let name = reader.question("Enter your name: ");
        let birthDate = reader.questionInt("Enter your date of birth: ");
        let age = reader.questionInt("Enter your age: ");
        let gender = reader.question("What is your gender? ");
        let cpf = reader.questionInt("Enter your CPF: ");
    } else {
        submenu();
    }
    submenu();
}

function providePassword() {

    password = reader.question("Enter your password: ");
    console.log("Your new password is:", password);

    menu();
}

function menu() {

    console.log("\n");
    console.log("Welcome to SENAC Bank!");
    console.log("1 - Update customer registration data");
    console.log("2 - Update customer password");
    console.log("3 - Make a deposit");
    console.log("4 - Make a withdrawal");
    console.log("5 - Apply for a loan");
    console.log("6 - View balance");
    console.log("7 - View statement");
    console.log("0 - Exit");

    let option = reader.questionInt("Enter the desired option: ");

    switch (option) {

        case 1:
            updateData();
            break;
        case 2:
            updatePassword();
            break;
        case 3:
            makeDeposit();
            break;
        case 4:
            makeWithdrawal();
            break;
        case 5:
            applyForLoan();
            break;
        case 6:
            viewBalance();
            break;
        case 7:
            viewStatement();
            returnStatement();
            break;
        case 0:
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid option");
            setTimeout(() => {
                menu();
            }, 500);
    }
}

function updatePassword() {

    let enteredPassword = reader.question("\nEnter your password: ");
    if (enteredPassword === password) {
        console.log("Correct password!");
    } else {
        console.log("Incorrect password: ", menu());
    }

    let newPassword1 = reader.question("Enter your new password: ");
    let newPassword2 = reader.question("Enter your new password again: ");

    if (newPassword1 === newPassword2) {
        console.log("Your new password is:", newPassword1);
        password = newPassword1;
    } else {
        console.log("Incorrect", menu());
    }
    menu();
}

function updateData() {

    name = reader.question("\nEnter your name: ");
    age = reader.questionInt("Enter your age: ");
    gender = reader.question("Enter your gender identity: ");
    birthDate = reader.questionInt("Enter your date of birth: ");
    cpf = reader.questionInt("Enter your CPF: ");

    menu();
}

function makeDeposit() {

    let testPassword = reader.question("Enter your password to proceed: ");

    if (testPassword === password) {
        let deposit = reader.questionInt("\nEnter the deposit amount R$");
        balance = deposit + balance;
    } else {
        console.log("Incorrect password: ", menu());
    }

    returnStatement("Deposit of " + deposit + " Reais");
    menu();
}

function makeWithdrawal() {

    let withdrawal;

    let testPassword = reader.question("Enter your password to proceed: ");

    if (testPassword === password) {
        console.log("Correct password, proceed!");
    } else {
        menu();
    }
    withdrawal = reader.questionInt("Enter the withdrawal amount: ");

    if (balance < withdrawal) {
        console.log("You cannot withdraw more than you have!");
        menu();
    } else {
        balance = balance - withdrawal;
        returnStatement("Withdrawal of " + withdrawal + " Reais");
        menu();
    }
}

function applyForLoan() {

    let testPassword = reader.question("Enter your password to proceed: ");

    if (testPassword === password) {

        let loan = balance / 2;
        console.log(loan);

        balance = balance + loan;
        returnStatement("Loan of " + loan + " Reais");
        console.log("Loan successfully completed:");
        menu();
    }
}

function viewBalance() {

    console.log("\nYour current balance is: ", balance);

    menu();
}

function viewStatement() {

    let testPassword = reader.question("Enter your password to proceed: ");

    if (testPassword === password) {

        for (let i = 0; i < position; i++) {
            console.log(statement[i], "\n");
        }
    }
}

function returnStatement(text) {

    statement[position] = text;
    if (position === 9) {
        position = 0;
    } else {
        position++;
        menu();
    }
}

submenu();
