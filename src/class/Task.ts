
export class Task {
  constructor(
    public id: string,
    public task: string,
    public day: string,
    public reminder: boolean
  ) {}

  format() {
    return `Need to do ${this.task} at ${this.day}`
  }
}