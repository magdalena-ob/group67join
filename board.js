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
    let name = element.assignedUser[0]['selectedName'];

    return `
    <div onclick="openInfo(${element['id']})" draggable="true" ondragstart="startDragging(${element['id']})"
     class="showTaskContainer" style="border-left-color: ${element['color']};">
        <div class="showInfo">
            <p><b>${element['title']}</b></p>
            <p>${element['category']}</p>
        </div>
        <div id="amount" class="amount d-none font-color">+${element.assignedUser.length - 1}</div>
        <div id="test" class="selected-user-picture">
            <img onmouseover="mouseOver()" onmouseout="mouseOut()" src="${img}">
            <div id="nameSelectedUser" class="d-none font-color"><b>${name}</b></div>
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
             ${loadUserDataImg()}
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

function loadUserDataImg() {
    let imgRow = `<div class="user-picture">`;
    for (let j = 0; j < allTasks.length; j++) {
        const task = allTasks[j];

        for (let i = 0; i < task['assignedUser'].length; i++) {
            const userData = task['assignedUser'][i];
            imgRow += `<img onmouseover="mouseOverBox()" onmouseout="mouseOutBox()" src="${userData['selectedImage']}"><div id="selectedUserName" class="d-none font-color"><b>${userData['selectedName']}</b></div>`
        }
    }
    imgRow += `</div>`
    return imgRow;
}

function mouseOver() {
    document.getElementById('nameSelectedUser').classList.remove('d-none');
    document.getElementById('amount').classList.remove('d-none');
}

function mouseOut() {
    document.getElementById('nameSelectedUser').classList.add('d-none');
    document.getElementById('amount').classList.add('d-none');
}

function mouseOverBox() {
    document.getElementById('selectedUserName').classList.remove('d-none');
}

function mouseOutBox() {
    document.getElementById('selectedUserName').classList.add('d-none'); 
}

/* function loadUserDataImgBoard() {

    let imgRow = `<div class="selected-user-picture">`;
    for (let j = 0; j < allTasks.length; j++) {
        const task = allTasks[j];

        for (let i = 0; i < task['assignedUser'].length; i++) {
            const userData = task['assignedUser'][i];
            imgRow += `<img src="${userData['selectedImage']}">`
        }
    }
    imgRow += `</div>`
    return imgRow;

} */

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