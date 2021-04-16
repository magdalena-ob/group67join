setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever/');

let allTasks = [];
let submissionDate;

/**
 * This function creates a new task and pushes the json into the array allTasks
 */
function createTask() {
    let title = document.getElementById('title');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let deadline = document.getElementById('submission-date');
    let urgency = document.getElementById('urgency');

    let task = {
        'createdAt': new Date().getTime(),
        'title': title.value,
        'category': category.value,
        'description': description.value,
        'deadline': deadline.value,
        'urgency': urgency.value,
        'status': 'ToDoContainer',
        'id': allTasks.length
    };
    
    addTask(task);


    console.log(allTasks);

    title.value = '';
    category.value = '';
    description.value = '';
    urgency.value = '';
    timePlanner();

    return false;
}

async function init() {

    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('tasks')) || [];
}

async function addTask(task) {
    allTasks.push(task);
    await backend.setItem('tasks', JSON.stringify(allTasks));

    showInfo();
}


function getDate() {
    submissionDate = new Date(document.getElementById('submission-date').value).getTime();
    console.log(submissionDate);
}

/**
 * its only possible to pick present or further days for the deadline, no days in the past
 * and current date is written automatically in the input field for the due date
 */
function timePlanner() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; // month as a number (0-11) - january = 0
    let year = today.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }

    today = year + "-" + month + "-" + day;
    console.log(today);

    document.getElementById('submission-date').value = `${today}`;
    document.getElementById('submission-date').setAttribute("min", today);
}

function resetAllInputs() {
    document.getElementById('title').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
    document.getElementById('urgency').value = '';
    timePlanner();
}

function showInfo() {
    document.getElementById('info-popup').classList.remove('d-none');
}

function closeInfoBox() {
    document.getElementById('info-popup').classList.add('d-none');
}