import { HasFormatter } from "../interface/HasFormatter";

export class ListTemplate {
  constructor(private container: HTMLUListElement){}

  render(item: HasFormatter, heading: string, pos: 'start' | 'end') {}
}