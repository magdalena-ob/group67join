setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever');

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
        let creationDateUnix = allTasks[i]['createdAt'];
        console.log(creationDateUnix);
        let wholeCreationDate = new Date(creationDateUnix);
        let creationDate = wholeCreationDate.toISOString().split('T')[0];
        
        document.getElementById('hero').innerHTML += `
        
        <div id="backlogCard" style="border-left-color: ${allTasks[i]["color"]};">
            <div id="showTitle"><b>Title</b>
                <div id="currenTitle" class="black">${allTasks[i]["title"]}</div>
            </div>
            <div id="creationDate"><b>CreationDate</b>
                <div id="currentCreationDate" class="black">${creationDate}</div>
            </div>
            <div id="deadLine"><b>DeadLine</b>
                <div id="currentDeadLine" class="black">${allTasks[i]["deadline"]}</div>
            </div>
            <div id="status"><b>Status</b>
                <div id="currentStatus" class="black">${allTasks[i]["status"]}</div>
            </div>
            <div id="urgency"><b>Urgency</b>
                <div id="currentUrgency" class="black">${allTasks[i]["urgency"]}</div>
            </div>
            <div id="description">            

                <p>
                    <a class="btn btn-primary btn-description" data-bs-toggle="collapse" href="#collap${[i]}" role="button" aria-expanded="false" aria-controls="collapseExample">
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

