setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');

let user = [];
let currentProfil = [];

/**
 * Load LogIn dates from Server
 */
async function init() {
    await downloadFromServer();
    let serverLogIn = JSON.parse(backend.getItem('user')) || [];
    user = serverLogIn;

    console.log(user)
}

/**
 * This function leads to the inputs for creating a newAccount
 */
function newAccount() {
    document.getElementById('new-account').classList.remove('d-none');
    document.getElementById('login-box').classList.add('d-none');
}

function backToLogin() {
    document.getElementById('new-account').classList.add('d-none');
    document.getElementById('login-box').classList.remove('d-none');
}

/**
 * This function creats newAccount by entering a new username and password and uploading a profile picture
 */
async function createNewAccount() {
    let newUser = document.getElementById('newUsername').value;
    let newPin = document.getElementById('newPassword').value;

    newPin = sha256(newPin);

    user.push({
        'userName': newUser,
        'password': newPin,
        //'userImage': result
    });

    await saveToServer(user);
}

async function saveToServer(user) {
    await backend.setItem('user', JSON.stringify(user));
    clearInput();
}

function clearInput() {
    document.getElementById('newUsername').value = ``;
    document.getElementById('newPassword').value = ``;
    justEntry();
}

function justEntry() {
    window.location = "board.html";
}

function loginExistingUser() {
    let currentUser = document.getElementById('username');
    let currentPin = document.getElementById('password');

    correctUser(currentUser, currentPin);

    currentUser.value = '';
    currentPin.value = '';
}

/**
 * This function controls if username and password match up with an existing user
 */
async function correctUser(currentUser, currentPin) {
    for (i = 0; i < user.length; i++) {
        if (currentUser.value == user[i]['userName'] && sha256(currentPin.value) == user[i]['password']) {

            filterProfil = user.filter(t => t['userName'] == currentUser.value);
            let name = filterProfil[currentProfil.length]['userName']
            currentProfil.push({
                'name': name
            });
            console.log(currentProfil)
            await backend.setItem('currentProfile', JSON.stringify(currentProfil));
            showLoginSuccess();
            return;
        }
    }
    document.getElementById('alert-wrong').classList.remove('d-none');
}

function showLoginSuccess() {
    document.getElementById('alert-success').classList.remove('d-none');
    setTimeout(function () {
        justEntry();
    }, 1000);
}

function closeAlertWrong() {
    document.getElementById('alert-wrong').classList.add('d-none');
}

async function logOut() {
    currentProfil = [];
    await backend.setItem('currentProfile', JSON.stringify(currentProfil));
    window.location = "index.html";
    
}


//Bilder upload alte version
/*
//Bilder upload
var loadFile = function (event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
}

//Bild umwandeln in Text
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function loadImage() {
    if (file = document.getElementById('file').files[0]) {
        result = await toBase64(file);
    } else {
        result = 'img/user.png'
    }
    await createNewAccount(result);
}*/








