import { ListTemplate } from "./class/ListTemplate.js";
import { Task } from "./class/Task.js";
const form = document.querySelector('form');
// inputs
const taskText = document.querySelector('#tasktext');
const taskDay = document.querySelector('#taskday');
const reminder = document.querySelector('#reminder');
// list item for task
const ul = document.querySelector('ul');
const list = new ListTemplate(ul);
// Generate Id
let generateUniqueId;
generateUniqueId = () => {
    const id = 'itd' + Math.floor(Math.random() * 100);
    return id;
};
// Load tasks from localStorage on page load
const tasks = loadTasks();
tasks.forEach((task) => {
    list.render(task.task, task.reminder, task.day);
});
// Save to localStorage
let saveTasks;
saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
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
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    let values;
    values = [generateUniqueId(), taskText.value, taskDay.value, reminder.checked];
    doc = new Task(...values);
    tasks.push(doc);
    saveTasks();
    list.render(taskText.value, reminder.checked, taskDay.value);
});
// Delete a task
ul === null || ul === void 0 ? void 0 : ul.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete-icon')) {
        // find the parent element if there is a button
        const listItem = target.closest('.task-details');
        if (listItem) {
            listItem.remove();
        }
    }
});
