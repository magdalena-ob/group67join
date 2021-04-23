setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');

let user = [];

/**
 * Load LogIn dates from Server
 */
async function init() {
    await downloadFromServer();
    let serverLogIn = JSON.parse(backend.getItem('user')) || [];
    user = serverLogIn;

    console.log(user);
}
/**
 * This function leads to the inputs for creating a newAccount
 */
function newAccount() {
    document.getElementById('new-account').classList.remove('d-none');
    document.getElementById('login-box').classList.add('d-none');
}
/**
 * This function creats newAccount by entering a new username and password and uploading a profile picture
 * 
 * @param {string} result - This is the picture you are uploading as your profile picture
 */
async function createNewAccount(result) {
    let newUser = document.getElementById('newUsername').value;
    let newPin = document.getElementById('newPassword').value;

    newPin = sha256(newPin);

    user.push({
        'userName': newUser,
        'password': newPin,
        'userImage': result
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
function correctUser(currentUser, currentPin) {
    for(i = 0; i < user.length; i++) {
        if (currentUser.value == user[i]['userName'] && sha256(currentPin.value) == user[i]['password']){
            console.log(currentUser.value + " is logged in!!");
            justEntry();
            return;
            
        }
    }
    console.log('Username oder Passwort ist falsch!');
}


//Bilder upload
var loadFile = function(event) {
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
    const file = document.getElementById('file').files[0];
    const result = await toBase64(file);
    user['userId'] = result;

    await createNewAccount(result);
}



