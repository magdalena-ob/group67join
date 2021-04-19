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
        
        <div id="backlogCard" style="border-left-color: ${allTasks[i]["color"]};">
            <div id="showTitle"><b>Title</b>
                <div id="currenTitle">${allTasks[i]["title"]}</div>
            </div>
            <div id="creationDate"><b>CreationDate</b>
                <div id="currentCreationDate">21.08.2020</div>
            </div>
            <div id="deadLine"><b>DeadLine</b>
                <div id="currentDeadLine">${allTasks[i]["deadline"]}</div>
            </div>
            <div id="status"><b>Status</b>
                <div id="currentStatus">${allTasks[i]["status"]}</div>
            </div>
            <div id="urgency"><b>Urgency</b>
                <div id="currentUrgency">${allTasks[i]["urgency"]}</div>
            </div>
            <div id="description">            

                <p>
                    <a class="btn btn-success" data-bs-toggle="collapse" href="#collap${[i]}" role="button" aria-expanded="false" aria-controls="collapseExample">
                        Description
                    </a>
                </p>
                <div class="collapse" id="collap${[i]}">
                    <div class="card card-body">
                        ${allTasks[i]["description"]}
                    </div>
                </div>

            </div>
        </div>
        `
    };
}

