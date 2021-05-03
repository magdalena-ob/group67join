setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');

let currentDraggedElement;
let allTasks;

/**
 * Load LogIn dates from Server
 */
async function init() {
    await downloadFromServer();
    let response = await JSON.parse(backend.getItem('tasks')) || [];
    allTasks = response;
    console.log(allTasks)
    updateTasks();
}

/**
 * This function filter and update the showTasks
 */
function updateTasks() {
    let toDoContainer = allTasks.filter(t => t['status'] == 'toDoContainer');
    update('toDoContainer', toDoContainer);

    let progress = allTasks.filter(t => t['status'] == 'progress');
    update('progress', progress);

    let testing = allTasks.filter(t => t['status'] == 'testing');
    update('testing', testing);

    let done = allTasks.filter(t => t['status'] == 'done');
    update('done', done); 
}

function update(containerId, array) {
    document.getElementById(containerId).innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        document.getElementById(containerId).innerHTML += generateAllTaksHTML(element);
    };
}

function generateAllTaksHTML(element) {
    let img = element.assignedUser[0]['selectedImage'];
    let name = element.assignedUser[0]['selectedName'];

    return `
    <div onclick="openInfo(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})"
     class="showTaskContainer" style="border-left-color: ${element['color']};">
        <div class="showInfo">
            <p><b>${element['title']}</b></p>
            <p>${element['category']}</p>
        </div>
        <div id="${element['id']}" class="amount d-none font-color">+${element.assignedUser.length - 1}</div>
        <div  class="selected-user-picture">
            <img onmouseover="mouseOver(${element['id']})" onmouseout="mouseOut(${element['id']})" src="${img}">
            <div id=${element['id']} class="d-none font-color"><b>${name}</b></div>
        </div>
    </div>
     `;
}

function openInfo(id) {
    let task = allTasks[id];
    document.getElementById('openContainer').classList.add('openContainer');
    document.getElementById('openContainer').innerHTML = `
    <div style="border-left-color: ${task['color']};"  class="infoBox">
        <div  class="close-btn">
            <button onclick="closeInfo()" type="button" class="btn btn-close" aria-label="Close"></button>
        </div>
        <h2 class="title"><b>${task['title']}</b></h2>
        <h2${task['category']}</h2>
        <h2>${task['status']}</h2>
        <div class="descriptionContainer">
            <p>${task['description']}</p>
        </div>
        <div class="assigned-container">
        <h2>Assigned To:</h2> 
             ${loadUserDataImg(task)}
        </div>
        <div class="footer-box">
            <button onclick="openDeleteTask(${task['id']})" class="btn btn-blue customButton">delete</button>
            <div class="deadline">
                <h3>Deadline: ${task['deadline']}</h3>
            </div>
        </div>
    </div>
    `;
}

function loadUserDataImg(task) {
    let imgRow = `<div class="user-picture">`;
    for (let i = 0; i < task['assignedUser'].length; i++) {
        const userData = task['assignedUser'][i];

        imgRow +=
        `<div class="user-description" id=${task['id']}font-color">
        <img src="${userData['selectedImage']}">
        <b>${userData['selectedName']}</b> </div>`
    }
    imgRow += `</div>`;
    return imgRow;
}

function mouseOver(id) {
    document.getElementById(id).classList.remove('d-none');
}

function mouseOut(id) {
    document.getElementById(id).classList.add('d-none');
}

function openDeleteTask(id) {
    let task = allTasks[id];
    document.getElementById('deleteContainer').innerHTML = '';
    document.getElementById('deleteContainer').classList.remove('d-none');
    document.getElementById('deleteContainer').innerHTML += `
    <div class="delete-container">
        <h2>Wollen sie es sicher Löschen???</h2>
        <div>
            <button onclick="deleteTask(${task['id']})" class="btn btn-blue delete-button">JA</button>
            <button onclick="closeDeleteTaskInfo()" class="btn btn-blue delete-button">NEIN</button>
        </div>
    </div>
    `;
}

function deleteTask(id) {
    allTasks.splice(id, 1);
    saveTask()
    document.getElementById('openContainer').classList.remove('openContainer');
    document.getElementById('openContainer').innerHTML = '';
    document.getElementById('deleteContainer').classList.add('d-none');
    updateTasks();
}

function closeDeleteTaskInfo() {
    document.getElementById('deleteContainer').classList.add('d-none');
}

function saveTask() {
    console.log(allTasks)
    backend.setItem('tasks', JSON.stringify(allTasks));
}

function closeInfo() {
    document.getElementById('openContainer').classList.remove('openContainer');
    document.getElementById('openContainer').innerHTML = '';
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    allTasks[currentDraggedElement]['status'] = category;
    backend.setItem('tasks', JSON.stringify(allTasks));
    updateTasks();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight')
    document.getElementById(id).classList.remove('drag-area-highlight-origin')
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight')
}

function origin(id) {
    document.getElementById(id).classList.add('drag-area-highlight-origin')
}

