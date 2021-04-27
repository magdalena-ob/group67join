setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');

let currentDraggedElement;
let allTasks;

async function init() {
    await downloadFromServer();
    let response = await JSON.parse(backend.getItem('tasks')) || [];
    allTasks = response;

    console.log(allTasks)

    updateTasks();
}

function updateTasks() {
    let toDoContainer = allTasks.filter(t => t['status'] == 'toDoContainer');

    document.getElementById('toDoContainer').innerHTML = '';

    for (let i = 0; i < toDoContainer.length; i++) {
        const element = toDoContainer[i];
        document.getElementById('toDoContainer').innerHTML += generateAllTaksHTML(element);
    };

    let progress = allTasks.filter(t => t['status'] == 'progress');

    document.getElementById('progress').innerHTML = '';

    for (let i = 0; i < progress.length; i++) {
        const element = progress[i];
        document.getElementById('progress').innerHTML += generateAllTaksHTML(element);
    };

    let testing = allTasks.filter(t => t['status'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateAllTaksHTML(element);
    };

    let done = allTasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateAllTaksHTML(element);
    };
}

function generateAllTaksHTML(element) {
    let img = element.assignedUser[0]['selectedImage'];
    return `
    <div onclick="openInfo(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})"
     class="showTaskContainer" style="border-left-color: ${element['color']};">
        <div class="showInfo">
            <p>${element['title']} </p>
            <p>${element['category']}</p>
        </div>
        <div class="selected-user-picture">
            <img src="${img}">
        </div>
    </div>
     `;
}

function openInfo(id) {
    let task = allTasks[id];
    document.getElementById('openContainer').classList.add('openContainer');
    document.getElementById('openContainer').innerHTML = `
    <div class="infoBox">
        <div class="close-btn">
            <button onclick="closeInfo()" type="button" class="btn btn-close" aria-label="Close">X</button>
        </div>
        <h2 class="title"><b>${task['title']}</b></h2>
        <h2${task['category']}</h2>
        <h2>${task['status']}</h2>
        <div class="descriptionContainer">
            <p>${task['description']}</p>
        </div>
        <div class="assigned-container">
        <h2>Assigned To:</h2> 
        <div class="user-picture">
            <img src="${task['assignedUser'][0]['selectedImage']}">
        </div>
        <div><b>${task['assignedUser'][0]['selectedName']}</b></div>
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

function openDeleteTask(id) {
    let task = allTasks[id];
    document.getElementById('deleteContainer').innerHTML = '';
    document.getElementById('deleteContainer').classList.remove('d-none'); 
    document.getElementById('deleteContainer').innerHTML += `
    <div class="delete-container">
        <h2>wollen sie es sicher Löschen???</h2>
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
    UpdateTasks();
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

function test() {
    backend.deleteItem('tasks');
}