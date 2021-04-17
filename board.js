setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever/');

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
        document.getElementById('done').innerHTML += generateAllTaksHTML(element);

    };


}



function generateAllTaksHTML(element) {


    return ` <div onclick="OpenInfo(${'id'})" draggable="true" ondragstart="startDragging(${element['id']})" class="showTaskContainer" style="border-left-color: green;">
    <div class="showInfo">
        <p>${element['title']} </p>
        <p>${element['category']}</p>
    </div>
    <div>
        <img src="img/user.png">

        </div>
         </div>
     `
        ;
}



function OpenInfo(id) {

    document.getElementById('OpenContainer').classList.add('openContainer');

    let task = allTasks[id];
    console.log(task)

    document.getElementById('OpenContainer').innerHTML = `
    
    <div class="InfoBox">
    <div class="close-button">
        <button onclick="closeInfo()" type="button" class="btn-close" aria-label="Close"></button>
    </div>

    <h2 class="title">title</h2>
    <h2>Category</h2>
    <h2>status</h2>
    <div class="descriptionContainer">
        <p>Description</p>
    </div>
    <div class="footer-box">
        <div class="deadline">
            <h3>Deadline: Datum</h3>
        </div>

    </div>

</div>



    `;

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
    let newCategory = allTasks[currentDraggedElement]['status'] = category;

/*     SaveNewCategory(newCategory); wird bearbeitet */

    UpdateTasks();
}

/* function SaveNewCategory(newCategory) {   - wird bearbeitet
    
     allTasks.push(newCategory);
    backend.setItem('tasks', JSON.stringify(allTasks)); 
} */


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

