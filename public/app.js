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
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    let values;
    values = [taskText.value, taskDay.value, reminder.checked];
    doc = new Task(...values);
    list.render(doc, taskText.value, reminder.checked, taskDay.value);
});
// Delete a task
const deleteButtons = document.querySelectorAll('.delete-icon');
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
