export class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(heading, reminder, day) {
        const li = document.createElement('li');
        li.classList.add('task-details');
        const h4 = document.createElement('h4');
        h4.innerText = heading;
        li.append(h4);
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.innerText = 'Due Day: ';
        const dayText = document.createTextNode(day);
        p.appendChild(strong);
        p.appendChild(dayText);
        li.append(p);
        const p2 = document.createElement('p');
        p2.innerText = `Need to do ${heading} at ${day}`;
        li.append(p2);
        if (reminder) {
            const spanReminder = document.createElement('span');
            spanReminder.classList.add('material-symbols-outlined', 'reminder-icon');
            spanReminder.innerText = 'alarm';
            li.append(spanReminder);
        }
        const editIcon = document.createElement('span');
        editIcon.classList.add('material-symbols-outlined', 'edit-icon');
        editIcon.innerText = 'edit';
        const deleteIcon = document.createElement('span');
        deleteIcon.classList.add('material-symbols-outlined', 'delete');
        deleteIcon.innerText = 'delete';
        li.append(editIcon);
        li.append(deleteIcon);
        this.container.append(li);
    }
}
