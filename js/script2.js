document.addEventListener("DOMContentLoaded", loadTasks);

let taskList = document.getElementById("task-list");

// Function to add a new task
function addTask() {
    let taskInput = document.getElementById("new-task");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = { text: taskText, completed: false };
    let tasks = getTasksFromStorage();
    tasks.push(task);
    saveTasksToStorage(tasks);

    taskInput.value = "";
    renderTasks();
}

// Function to render tasks from localStorage
function renderTasks(filter = "all") {
    let tasks = getTasksFromStorage();
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;

        let li = document.createElement("li");
        li.className = "task" + (task.completed ? " completed" : "");
        li.setAttribute("draggable", "true");
        li.setAttribute("data-index", index);

        li.innerHTML = `
            <span>${task.text}</span>
            <select onchange="changeTaskStatus(${index}, this.value)">
                <option value="pending" ${!task.completed ? "selected" : ""}>Pending</option>
                <option value="completed" ${task.completed ? "selected" : ""}>Completed</option>
            </select>
            <div>
                <button class="edit" onclick="editTask(${index})">✏️</button>
                <button class="delete" onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;

        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", drop);

        taskList.appendChild(li);
    });
}

// Change task status from Pending to Completed (or vice versa)
function changeTaskStatus(index, status) {
    let tasks = getTasksFromStorage();
    tasks[index].completed = status === "completed";
    saveTasksToStorage(tasks);
    renderTasks();
}

// Edit a task
function editTask(index) {
    let tasks = getTasksFromStorage();
    let newText = prompt("Edit Task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasksToStorage(tasks);
        renderTasks();
    }
}

// Delete a task
function deleteTask(index) {
    let tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    renderTasks();
}

// Filter tasks
function filterTasks(filter) {
    renderTasks(filter);
}

// Drag and drop functionality
let draggedItem = null;

function dragStart(event) {
    draggedItem = event.target;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let tasks = getTasksFromStorage();
    let draggedIndex = draggedItem.getAttribute("data-index");
    let targetIndex = event.target.getAttribute("data-index");

    if (draggedIndex !== null && targetIndex !== null) {
        let draggedTask = tasks.splice(draggedIndex, 1)[0];
        tasks.splice(targetIndex, 0, draggedTask);
        saveTasksToStorage(tasks);
        renderTasks();
    }
}

// Local storage handling
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on page load
function loadTasks() {
    renderTasks();
}
