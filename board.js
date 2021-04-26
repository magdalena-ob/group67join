setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');

let currentDraggedElement;
let allTasks;

async function init() {
    await downloadFromServer();
    let response = await JSON.parse(backend.getItem('tasks')) || [];
    allTasks = response;

    console.log(allTasks)

    UpdateTasks();
}

function UpdateTasks() {
    let ToDoContainer = allTasks.filter(t => t['status'] == 'ToDoContainer');

    document.getElementById('ToDoContainer').innerHTML = '';

    for (let i = 0; i < ToDoContainer.length; i++) {
        const element = ToDoContainer[i];
        document.getElementById('ToDoContainer').innerHTML += generateAllTaksHTML(element);
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
        let assignedUsers = element['assignedUser'];
        document.getElementById('done').innerHTML += generateAllTaksHTML(element);

        for (let j = 0; j < assignedUsers.length; j++) {
            const assignedUser = assignedUsers[j];
            document.getElementById('done').innerHTML += `<div>${assignedUser['selectedName']}</div>`; 
        }
    };
}

function generateAllTaksHTML(element) {
    return `
    <div onclick="OpenInfo(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})"
     class="showTaskContainer" style="border-left-color: ${element['color']};">
        <div class="showInfo">
            <p>${element['title']} </p>
            <p>${element['category']}</p>
        </div>
        <div>
            <img id="selected-user" src="img/user.png">
        </div>
    </div>
     `;
}

function OpenInfo(id) {
    let task = allTasks[id];
    document.getElementById('OpenContainer').classList.add('openContainer');
    document.getElementById('OpenContainer').innerHTML = `
    <div class="InfoBox">
        <div class="close-button">
            <button onclick="closeInfo()" type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <h2 class="title">${task['title']}</h2>
        <h2${task['category']}</h2>
        <h2>${task['status']}</h2>
        <div class="descriptionContainer">
            <p>${task['description']}</p>
        </div>
        <div class="footer-box">
            <button onclick="openDeleteTask(${task['id']})" class="btn btn-danger customButton">delete</button>
            <div class="deadline">
                <h3>Deadline: ${task['deadline']}</h3>
            </div>
        </div>
    </div>
    `;
}

function openDeleteTask(id) {
    let task = allTasks[id];
    document.getElementById('deleteContainer').classList.remove('d-none'); 
    document.getElementById('deleteContainer').innerHTML = `
    <h1>wollen sie es sicher Löschen???</h1>
        <div>
            <button onclick="deleteTask(${task['id']})" class="btn btn-warning delete-button">JA</button>
            <button onclick="closeDeleteTaskInfo()" class="btn btn-warning delete-button">NEIN</button>
        </div>
        `;
}

function deleteTask(id) {
    allTasks.splice(id, 1);
    saveTask()
    document.getElementById('OpenContainer').classList.remove('openContainer');
    document.getElementById('OpenContainer').innerHTML = '';
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
    document.getElementById('OpenContainer').classList.remove('openContainer');
    document.getElementById('OpenContainer').innerHTML = '';
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

    UpdateTasks();
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