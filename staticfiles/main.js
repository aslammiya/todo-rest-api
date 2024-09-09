const API_URL = 'http://127.0.0.1:8000/api/todos/';
console.log("ccc")
// Function to fetch and display all tasks
function fetchTodos() {
$.ajax({
url: API_URL,
method: 'GET',
success: function (todos) {
    $('#todoList').empty();  // Clear current list
    todos.forEach(todo => {
        const completedClass = todo.completed ? 'text-decoration-line-through' : ''; // Strike-through if completed
        const checked = todo.completed ? 'checked' : ''; // Checkbox checked if completed
        
        $('#todoList').append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div class="form-check">
                <!-- Checkbox for the todo item -->
                <input class="form-check-input" type="checkbox" id="check${todo.id}" ${checked} onchange="toggleComplete(${todo.id})">
                <label class="form-check-label ${completedClass}" for="check${todo.id}">
                    <h5>${todo.title}</h5>
                    <p>${todo.description}</p>
                </label>
            </div>
            <div>
                <button class="btn btn-sm btn-warning me-2" onclick="editTask(${todo.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${todo.id})">Delete</button>
            </div>
        </li>
    `);
    });
}
});
}

// Function to toggle task completion
function toggleComplete(id) {
// Fetch the current task details
const checkbox = document.getElementById(`check${id}`);
const isCompleted = checkbox.checked;

// Fetch the existing task title and description from the DOM
const title = checkbox.closest('li').querySelector('h5').innerText;
const description = checkbox.closest('li').querySelector('p').innerText;

// Update the completed status on the server
$.ajax({
url: API_URL + id + '/',
method: 'PUT',
contentType: 'application/json',
data: JSON.stringify({ title: title, description: description, completed: isCompleted }), // Include all required fields
success: function () {
    fetchTodos();  // Refresh the task list to reflect the new completion state
}
});
}


// Function to add a new task
$('#todoForm').submit(function (event) {
    event.preventDefault();  // Prevent form submission

    const newTodo = {
        title: $('#title').val(),
        description: $('#description').val(),
        completed: false
    };

    $.ajax({
        url: API_URL,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(newTodo),
        success: function () {
            $('#title').val('');  // Clear form
            $('#description').val('');
            fetchTodos();  // Refresh the task list
        }
    });
});

// Function to delete a task
function deleteTask(id) {
    $.ajax({
        url: API_URL + id + '/',
        method: 'DELETE',
        success: function () {
            fetchTodos();  // Refresh the task list
        }
    });
}

// Function to edit a task (open a modal with form to edit)
function editTask(id) {
    const todo = $('#todoList').find(`[data-id="${id}"]`);

    const newTitle = prompt("Edit title:", todo.title);
    const newDescription = prompt("Edit description:", todo.description);

    if (newTitle && newDescription) {
        $.ajax({
            url: API_URL + id + '/',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ title: newTitle, description: newDescription, completed: false }),
            success: function () {
                fetchTodos();  // Refresh the task list
            }
        });
    }
}

// Initial fetch of tasks when page loads
$(document).ready(function () {
    fetchTodos();
});