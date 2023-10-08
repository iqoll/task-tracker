import { ListTemplate } from "./class/ListTemplate.js"
import { Task } from "./class/Task.js"
import { HasFormatter } from "./interface/HasFormatter.js"

const form = document.querySelector('form')!

// inputs
const taskText = document.querySelector('#tasktext') as HTMLInputElement
const taskDay = document.querySelector('#taskday') as HTMLInputElement
const reminder = document.querySelector('#reminder') as HTMLInputElement

// list item for task
const ul = document.querySelector('ul')!
const list = new ListTemplate(ul)

form.addEventListener('submit', (e: Event) => {
  e.preventDefault()

  let doc: HasFormatter

  let values: [string, string, boolean]
  
  values = [taskText.value, taskDay.value, reminder.checked]

  doc = new Task(...values)
  list.render(doc, taskText.value, reminder.checked, taskDay.value)
})

// Delete a task
const deleteButtons = document.querySelectorAll('.delete-icon')

ul?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if(target.classList.contains('delete-icon')) {
    // find the parent element if there is a button
    const listItem = target.closest('.task-details')
    if(listItem) {
      listItem.remove()
    }
  }
})
