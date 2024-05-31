// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const RANDOM_ID = Math.random().toString(36);
    return RANDOM_ID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

    const taskCard = $(`
    <div class="">
        <h3>${task.title}</h3>
    </div>
    `);

    $("#todo-cards").append(taskCard)
}


// Todo: create a function to render the task list and make cards draggable
//Added Draggable
function renderTaskList() {
    const tasks = JSON.parse(localStorage.getItem('load')) || [];

    tasks.forEach(function(task) {
        createTaskCard(task)
    })


    // $(".draggable").draggable({
    //     opacity: 1,
    //     zIndex: 100,
    //     helper: function (e) {
    //         const original = $(e.target).hasClass("ui-draggable")
    //             ? $(e.target)
    //             : $(e.target).closest("ui-draggable");
    //         return original.clone().css({
    //             width: original.outerWidth(),
    //         });
    //     },
    // });
}

// Todo: create a function to handle adding a new task
//Worked on Pulling from Local Storage
function handleAddTask(event) {
    event.preventDefault();
    const tasks = JSON.parse(localStorage.getItem('load')) || [];
    const load = {
        id: generateTaskId(),
        title: $("mlTitle").val(),
        description: $("mlDescription").val(),
        dueDate: $("mlDeadline").val(),
        status: "to-do",
    }

    tasks.push(load);
    localStorage.setItem("load", JSON.stringify(tasks));
}

// Todo: create a function to handle deleting a task
//Id Button Function on Delete
function handleDeleteTask(event) {
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-project-id', project.id);
    cardDeleteBtn.on('click', handleDeleteProject);

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Made sure to add date picker with query
    $("#memo").on("click", handleAddTask);
    $("#due-date").datepicker({
        changeMonth: true,
        changeYear: true,
    });
});
