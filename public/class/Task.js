export class Task {
    constructor(id, task, day, reminder) {
        this.id = id;
        this.task = task;
        this.day = day;
        this.reminder = reminder;
    }
    format() {
        return `Need to do ${this.task} at ${this.day}`;
    }
}
