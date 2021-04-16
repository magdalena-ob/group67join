setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever/');

let LogIn = [];
let searchLogIn = [];
function createUser() {
    let newUser = document.getElementById('Username').value;
    let newPassword = document.getElementById('Password').value;
    LogIn.push({
        'UserNames': newUser,
        'Passwords': newPassword
    });
    justEntry();
    clearInput();
}

function clearInput() {
    document.getElementById('Username').value = ``;
    document.getElementById('Password').value = ``;
}

function justEntry() {
   window.location = "board.html";
}

function searchUser() {
    let oldUsername = document.getElementById('Username').value;
    let oldPassword = document.getElementById('Password').value;
    searchLogIn.push({
        'searchName': oldUsername,
        'searchPassword': oldPassword
    });
    if (LogIn['UserNames'].indexOf(searchLogIn['oldUsername']) === -1 && LogIn['Passwords'].indexOf(searchLogIn['oldPassword']) === -1) {
        console.log("irgendwas stimmt nicht!!!");
    } else {
        console.log("Gratuliere!!!");
    }
}

