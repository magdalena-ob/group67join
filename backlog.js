setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever/');

let currentDraggedElement;
let allTasks;

async function init() {

    await downloadFromServer();
    let response = await JSON.parse(backend.getItem('tasks')) || [];

    allTasks = response;


    console.log(allTasks)

}


