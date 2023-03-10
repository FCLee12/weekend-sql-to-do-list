console.log('JS is ready');

$(document).ready( onReady );

function onReady() {
    console.log('jQuery is ready');

    // listener to add task
    $('#addTaskBtn').on('click', addTask);

    // listener to delete task
    $('#taskDisplayZone').on('click', '.deleteBtn', deleteTask);

    // initial GET call to populate DOM
    getTasks();
}

// GET
function getTasks() {
    console.log('getTasks running');
    // empties out the displayZone for tasks
    $('#taskDisplayZone').empty();
    $.ajax({
        method: 'GET',
        url: '/toDos'
    }).then((response) => {
        console.log( 'GET /toDos is successful:', response );
        render(response);
    }).catch((error) => {
       console.log( 'GET /toDos failed', error );
    })
}

// render
function render(arrayOfObjects) {
    console.log('render running', arrayOfObjects);
    for(let i = 0; i < arrayOfObjects.length; i++) {
       if(arrayOfObjects[i].complete === true) {
        $('#taskDisplayZone').append(`
        <tr class="finish" data-id=${arrayOfObjects[i].id}>    
            <td>${arrayOfObjects[i].task}</td>
            <td>Done!</td>
            <td><button class="deleteBtn">Delete</button></td>   
        </tr>
        `);
       } else{
        $('#taskDisplayZone').append(`
        <tr class="work" data-id=${arrayOfObjects[i].id}>    
            <td>${arrayOfObjects[i].task}</td>
            <td><button class="completeBtn">Complete</button></td>
            <td><button class="deleteBtn">Delete</button></td>   
        </tr>
    `);
       }
    };
}

// POST
function addTask() {
    console.log('addTask running');
    
    // this will be passed to the server via ajax
    let newTask = {
        task: $('#taskInput').val()
    };

    $.ajax({
        method: 'POST',
        url: '/toDos',
        data: newTask
    }).then((response) => {
        console.log('POST /toDos was successful', response);
        clearInputs();
        getTasks();
    }).catch((error) => {
        console.log('Error adding newTask', error);
    })
}

// clearInput
function clearInputs() {
    $('#taskInput').val('');
}

// DELETE
function deleteTask() {
    console.log('deleteTask is running', $(this));
    const taskId = $(this).parent().parent().data().id;
    console.log('this is the task id:', taskId);

    $.ajax({
        method: 'DELETE',
        url: `/toDos/task/${taskId}`
    }).then((response) => {
        console.log('DELETE /toDos was successful', response);
        getTasks();
    }).catch((error) => {
        console.log('DELETE /toDos failed', error);
    })
}