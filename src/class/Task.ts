import { HasFormatter } from "../interface/HasFormatter";

export class Task  implements HasFormatter{
  constructor(
    public task: string,
    public day: string,
    public reminder: boolean
  ) {}

  format() {
    return `Need to do ${this.task} at ${this.day}`
  }
}