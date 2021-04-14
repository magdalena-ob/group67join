let allTasks = [];

function createTask() {
    let title = document.getElementById('title');
    let category = document.getElementById('category');
    let description = document.getElementById('description');
    let deadline = document.getElementById('submisson-date');
    let urgency = document.getElementById('urgency');

    let task = {
        'title': title.value,
        'category': category.value,
        'description': description.value,
        'deadline': deadline.value,
        'urgency': urgency.value
    };

    allTasks.push(task);

    console.log(allTasks);

    title.value = '';
    description.value = '';

}