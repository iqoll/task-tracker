import { ListTemplate } from "./class/ListTemplate.js";
import { Task } from "./class/Task.js";
const form = document.querySelector('.new-item-form');
// inputs
const taskText = document.querySelector('#tasktext');
const taskDay = document.querySelector('#taskday');
const reminder = document.querySelector('#reminder');
// list item for task
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
// Load Task
function loadTasks() {
    const taskJSON = localStorage.getItem('tasks');
    if (taskJSON) {
        return JSON.parse(taskJSON);
    }
    else {
        return [];
    }
}
// Load tasks from localStorage on page load
const tasks = loadTasks();
tasks.forEach((task) => {
    list.render(task, task.task, task.reminder, task.day);
});
// Save to localStorage
let saveTasks;
saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
// Generate Id
let generateUniqueId;
generateUniqueId = () => {
    const id = 'itd' + Math.floor(Math.random() * 100);
    return id;
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    let values;
    values = [generateUniqueId(), taskText.value, taskDay.value, reminder.checked];
    doc = new Task(...values);
    tasks.push(doc);
    saveTasks();
    list.render(doc, taskText.value, reminder.checked, taskDay.value);
    // Clear the form 
    taskText.value = '';
    taskDay.value = '';
    reminder.checked = false;
    location.reload();
});
// Delete a task
ul === null || ul === void 0 ? void 0 : ul.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete-icon')) {
        // find the parent element if there is a button
        const listItem = target.closest('.task-details');
        if (listItem) {
            // Remove the task from the DOM
            listItem.remove();
            // Find the task in tasks array by some unique id
            const taskId = listItem.getAttribute('data-task-id');
            const taskIndex = tasks.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
                // Remove the task from tasks array
                tasks.splice(taskIndex, 1);
                // Update localStorage
                saveTasks();
            }
        }
    }
});
// Update Form
const formModal = document.querySelector('.modal');
const editForm = document.querySelector('.edit-task-form');
const editButtons = document.querySelectorAll('.edit-icon');
const editTask = document.getElementById('edit-tasktext');
const editDay = document.getElementById('edit-taskday');
const editReminder = document.getElementById('edit-reminder');
let taskId;
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        var _a, _b, _c;
        // extract the task details to populate form edit
        const listItem = button.parentElement;
        const taskText = (_a = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('h4')) === null || _a === void 0 ? void 0 : _a.textContent;
        const taskDay = (_c = (_b = listItem === null || listItem === void 0 ? void 0 : listItem.querySelector('p')) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.replace('Due Day:', '').trim();
        // Populate the form fields
        editTask.value = taskText;
        editDay.value = taskDay;
        editReminder.checked = true;
        taskId = listItem.getAttribute('data-task-id');
        // Show the edit form modal
        formModal.style.display = 'block';
    });
});
// edit form submission to update the task
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
        taskToEdit.task = editTask.value;
        taskToEdit.day = editDay.value;
        taskToEdit.reminder = editReminder.checked;
    }
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1 && taskToEdit) {
        // Edit the task 
        tasks[taskIndex] = taskToEdit;
        // Update Local Storage
        saveTasks();
        // Find the existing list item for the task
        const existingListItem = document.querySelector(`li[data-task-id="${taskId}]`);
        if (existingListItem) {
            // Update the content of existing list item
            const h4 = existingListItem.querySelector('h4');
            const p = existingListItem.querySelector('p');
            const p2 = existingListItem.querySelectorAll('p')[1];
            if (h4 && p && p2) {
                h4.innerText = editTask.value;
                p.innerText = `Due Day: ${editDay.value}`;
                p2.innerText = `Need to do ${editTask.value} at ${editDay.value}`;
            }
        }
    }
    // Hide the edit form modal
    formModal.style.display = 'none';
    location.reload();
});
