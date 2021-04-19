setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever/');

let currentDraggedElement;
let allTasks;

async function init() {
    await downloadFromServer();
    let response = await JSON.parse(backend.getItem('tasks')) || [];
    allTasks = response;
    //console.log(allTasks)
    createBacklogCards();
}

function createBacklogCards() {
    for (let i = 0; i < allTasks.length; i++) {
        document.getElementById('hero').innerHTML += `
        
        <div id="backlogCard" class="h3" style="border-left-color: ${allTasks[i]["color"]};">
            <div id="showTitle">Title
                <div id="currenTitle">${allTasks[i]["title"]}</div>
            </div>
            <div id="creationDate">CreationDate
                <div id="currentCreationDate">21.08.2020</div>
            </div>
            <div id="deadLine">DeadLine
                <div id="currentDeadLine">${allTasks[i]["deadline"]}</div>
            </div>
            <div id="status">Status
                <div id="currentStatus">${allTasks[i]["status"]}</div>
            </div>
            <div id="urgency">Urgency
                <div id="currentUrgency">${allTasks[i]["urgency"]}</div>
            </div>
            <div class="description" onclick="openDescription()" id="description">Description</div> 
        </div> 
        
        `
    };
}

