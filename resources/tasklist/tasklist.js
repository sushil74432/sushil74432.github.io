const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('addTask');
const clearTasksBtn = document.getElementById('clearTask');
const taskList = document.getElementById('tasks');

// Load tasks from localStorage if they exist
console.log("Localstorage :: " + localStorage.getItem('tasks'))
if (localStorage.getItem('tasks')) {
    document.getElementById('tasks').textContent = localStorage.getItem('tasks');
}

function addTask() {
  const task = document.getElementById('task-input').value.trim();
  if (task) {
    var curTaskList = document.getElementById("tasks");
    console.log(curTaskList.textContent);
    curTaskList.textContent += "\n"+task;
    saveTasks();
  }
};

function clearTask() {
  taskList.innerHTML = '';
  localStorage.removeItem('tasks');
};

function saveTasks() {
    localStorage.setItem('tasks', document.getElementById('tasks').textContent);
    console.log("saved");
    console.log(localStorage.getItem('tasks'));
}
