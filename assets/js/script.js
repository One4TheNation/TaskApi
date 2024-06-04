// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const randomId = Math.random().toString(36);
    return randomId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $("<div>");
    taskCard.addClass("card task-card draggable mb-3");
    taskCard.attr("id", task.id);
    console.log(task.title);
    const taskCardHeader = $("<div>").addClass("card-header h4").text(task.title);
    const infoEl = `
    <div>
            <div class="modal-body">
            <h3>${task.title}</h3>
            <h5>${task.dueDate}</h5>
            <p>${task.description}</p>
                <button>delete</button>
        </div>
    </div>`
    taskCard.append(infoEl);
    $("#todo-cards").append(taskCard);

}



// Todo: create a function to render the task list and make cards draggable
//Added Draggable
function renderTaskList() {

    $("#todo-cards").empty();
    let tasks = JSON.parse(localStorage.getItem('load')) || [];
    tasks.forEach(function (task) {
        createTaskCard(task)
    })
    $(".draggable").draggable({
        opacity: 1,
        zIndex: 100,
    });
}

// Todo: create a function to handle adding a new task
//Worked on Pulling from Local Storage
function handleAddTask(event) {
    event.preventDefault();
    const tasks = JSON.parse(localStorage.getItem('load')) || [];
    const load = {
        id: generateTaskId(),
        title: $("#mlTitle").val(),
        description: $("#mlDescription").val(),
        dueDate: $("#mlDeadline").val(),
        status: "todo",
    }
    tasks.push(load);
    localStorage.setItem("load", JSON.stringify(tasks));
    renderTaskList()
}

// Todo: create a function to handle deleting a task
//Id Button Function on Delete
function handleDeleteTask(event) {
    const id = $(this).attr("id");
    console.log(id);

    let tasks = JSON.parse(localStorage.getItem("load")) || [];
    const newTaskList = tasks.filter(function(load) {
        return tasks.id !== id
    });

    localStorage.setItem("load", JSON.stringify(newTaskList));

    renderTaskList();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const task = readTaskFromStorage();
    const taskCard = ui.draggable[0].dataset.nextId;
    const newMemo = event.target.card;
    for (let task of task) {
        if (task.card === taskCard) {
            task.memo = newMemo;
        }
    }
    localStorage.setItem("load", JSON.stringify(task));
    printProjectData();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // Made sure to add date picker with query
    renderTaskList()
    $("#memo").on("click", handleAddTask);
    $("#mlDeadline").datepicker({
        changeMonth: true,
        changeYear: true,
    });

    // Droppable & Draggable Lanes
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
});
