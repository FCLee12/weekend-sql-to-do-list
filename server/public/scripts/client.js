console.log('JS is ready');

$(document).ready( onReady );

function onReady() {
    console.log('jQuery is ready');

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
            <li class="finish">${arrayOfObjects[i].task}</li>
        `)
       } else{
        $('#taskDisplayZone').append(`
        <li class="work">${arrayOfObjects[i].task}</li>
    `)
       }
    }
}