setURL('http://gruppe-67.developerakademie.com/smallest_backend_ever/');


async function init() {

    await downloadFromServer();
    let response = await JSON.parse(backend.getItem('tasks')) || [];

    console.log(response);


    showTask(response);


}

function showTask(response) {


    for (let i = 0; i < response.length; i++) {
        let task = response[i];

        document.getElementById('ToDoContainer').innerHTML += `
        
        <div class="showTaskContainer" style="border-left-color: green;">
        <div class="showInfo">
            <p>${task['title']} </p>
            <p>${task['category']}</p>
        </div>
        <div>
            <img src="img/user.png">

            </div>
             </div>
        
        `;
    }

}


