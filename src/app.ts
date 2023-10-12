import { ListTemplate } from "./class/ListTemplate.js"
import { Task } from "./class/Task.js"

const form = document.querySelector('form')!

// inputs
const taskText = document.querySelector('#tasktext') as HTMLInputElement
const taskDay = document.querySelector('#taskday') as HTMLInputElement
const reminder = document.querySelector('#reminder') as HTMLInputElement

// list item for task
const ul = document.querySelector('ul')!
const list = new ListTemplate(ul)


// Generate Id
let generateUniqueId: Function

generateUniqueId = () => {
  const id = 'itd' + Math.floor(Math.random() * 100)
  return id
}

// Load tasks from localStorage on page load
const tasks : Task[] = loadTasks()
tasks.forEach((task) => {
  list.render(task, task.task, task.reminder, task.day)
})

// Save to localStorage
let saveTasks : Function

saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Load Task
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('tasks')
  if(taskJSON) {
    return JSON.parse(taskJSON)
  } else {
    return []
  }
}

form.addEventListener('submit', (e: Event) => {
  e.preventDefault()

  let doc: Task

  let values: [string, string, string, boolean]
  
  values = [generateUniqueId() ,taskText.value, taskDay.value, reminder.checked]

  doc = new Task(...values)
  tasks.push(doc)
  saveTasks()
  list.render(doc, taskText.value, reminder.checked, taskDay.value)
})

// Delete a task
ul?.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if(target.classList.contains('delete-icon')) {
    // find the parent element if there is a button
    const listItem = target.closest('.task-details')
    if(listItem) {
      // Remove the task from the DOM
      listItem.remove()

      // Find the task in tasks array by some unique id
      const taskId = listItem.getAttribute('data-task-id')
      const taskIndex = tasks.findIndex((task) => task.id === taskId)
      
      if(taskIndex !== -1) {
        // Remove the task from tasks array
        tasks.splice(taskIndex, 1)

        // Update localStorage
        saveTasks()
      }
    }
  }
})

