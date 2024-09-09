var wsProtocol = (window.location.protocol === 'https:') ? 'https://' : 'http://';
const API_URL = wsProtocol + window.location.host + '/api/todos/';

// Function to fetch and display all tasks
function fetchTodos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = '';  // Clear current list
            todos.forEach(todo => {
                const completedClass = todo.completed ? 'text-decoration-line-through' : ''; // Strike-through if completed
                const checked = todo.completed ? 'checked' : ''; // Checkbox checked if completed

                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                listItem.innerHTML = `
                    <div class="form-check">
                    <label class="form-check-label ${completedClass}" for="check${todo.id}">
                    <h5>${todo.title}</h5>
                    <p>${todo.description}</p>
                    </label>
                    </div>
                    <div>
                    <input class="form-check-input mx-5" type="checkbox" id="check${todo.id}" ${checked} onchange="toggleComplete(${todo.id})">
                        <button class="btn btn-sm btn-warning me-2" onclick="editTask(${todo.id})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(${todo.id})">Delete</button>
                        </div>
                `;
                todoList.appendChild(listItem);
            });
        });
    }

    // Function to toggle task completion
    function toggleComplete(id) {
        const checkbox = document.getElementById(`check${id}`);
    const isCompleted = checkbox.checked;
    const title = checkbox.closest('li').querySelector('h5').innerText;
    const description = checkbox.closest('li').querySelector('p').innerText;

    fetch(API_URL + id + '/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title, description: description, completed: isCompleted })
    }).then(() => fetchTodos());
}

console.log("jsnvcvbn")
// Function to add a new task
document.getElementById('todoForm').addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent form submission
    
    const newTodo = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        completed: false
    };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
    }).then(() => {
        document.getElementById('title').value = '';  // Clear form
        document.getElementById('description').value = '';
        fetchTodos();
    });
});

// Function to delete a task
function deleteTask(id) {
    fetch(API_URL + id + '/', {
        method: 'DELETE'
    }).then(() => fetchTodos());
}

// Function to edit a task
function editTask(id) {
    const newTitle = prompt("Edit title:");
    const newDescription = prompt("Edit description:");

    if (newTitle && newDescription) {
        fetch(API_URL + id + '/', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, description: newDescription, completed: false })
        }).then(() => fetchTodos());
    }
}

// Initial fetch of tasks when page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchTodos();
});