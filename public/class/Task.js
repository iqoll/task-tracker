export class Task {
    constructor(task, day, reminder) {
        this.task = task;
        this.day = day;
        this.reminder = reminder;
    }
    format() {
        return `Need to do ${this.task} at ${this.day}`;
    }
}
