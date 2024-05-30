// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.random().toString(36);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    function createTaskCard(title, description, dueDate, status) {
        // Created a new task card with return
        const taskCard = {
            title: title,
            description: description,
            dueDate: dueDate,
            status: status,
        };
        return taskCard;
    }
}

    // Todo: create a function to render the task list and make cards draggable
    function renderTaskList() {
        $(".draggable").draggable({
            opacity: 1,
            zIndex: 100,
            helper: function (e) {
                const original = $(e.target).hasClass("ui-draggable")
                    ? $(e.target)
                    : $(e.target).closest("ui-draggable");
                return original.clone().css({
                    width: original.outerWidth(),
                });
            },
        });
    }

    // Todo: create a function to handle adding a new task
    function handleAddTask(event) {
        event.preventDefault()
        const load = {
            id: generateTaskId(),
            title: $("mlTitle").val(),
            description: $("mlDescription").val(),
            dueDate: $("mlDeadline").val(),
            status: "to-do",
        }
        localStorage.setItem("load", JSON.stringify(task));
        location.assign("index.html");
        console.log("Salutation")
    }

    // Todo: create a function to handle deleting a task
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
        $("submit").on("click", handleAddTask);
        $("#due-date").datepicker({
            changeMonth: true,
            changeYear: true,
        });
    });
