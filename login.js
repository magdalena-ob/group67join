setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever/');

let LogIn = [];
let oldUsername = [];
let oldPassword = [];
/**
 * Load LogIn dates from Server
 */
async function init() {
    await downloadFromServer();
    let serverLogIn = JSON.parse(backend.getItem('LogIn')) || [];
    LogIn = serverLogIn;
}

function createUser() {
    let newUser = document.getElementById('Username').value;
    let newPassword = document.getElementById('Password').value;
    LogIn.push({
        'UserNames': newUser,
        'Passwords': newPassword
    });
    saveToServer(LogIn);
   
}

async function saveToServer(LogIn) {
    await backend.setItem('LogIn', JSON.stringify(LogIn));
    clearInput();
}

function clearInput() {
    document.getElementById('Username').value = ``;
    document.getElementById('Password').value = ``;
    justEntry();
}

function justEntry() {
    window.location = "board.html";
}

function createOldUser() {
    let searchName = document.getElementById('Username').value;
    let searchPassword = document.getElementById('Password').value;
    oldUsername.push(searchName);
    oldPassword.push(searchPassword);
    searchUser();
}

function searchUser() {
    if (LogIn['UserNames'].indexOf('oldUsername') === -1 && LogIn['Passwords'].indexOf('oldPassword') === -1) {
        console.log("irgendwas stimmt nicht!!!");
    } else {
        console.log("Gratuliere!!!");
    }
}

