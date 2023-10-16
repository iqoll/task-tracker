  import { ListTemplate } from "./class/ListTemplate.js"
  import { Task } from "./class/Task.js"

  const form = document.querySelector('.new-item-form') as HTMLFormElement

  // inputs
  const taskText = document.querySelector('#tasktext') as HTMLInputElement
  const taskDay = document.querySelector('#taskday') as HTMLInputElement
  const reminder = document.querySelector('#reminder') as HTMLInputElement

  // list item for task
  const ul = document.querySelector('ul')!
  const list = new ListTemplate(ul)

  // Load Task
  function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem('tasks')
    if(taskJSON) {
      return JSON.parse(taskJSON)
    } else {
      return []
    }
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

  // Generate Id
  let generateUniqueId: Function

  generateUniqueId = () => {
    const id = 'itd' + Math.floor(Math.random() * 100)
    return id
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

    // Clear the form 
    taskText.value = '';
    taskDay.value = '';
    reminder.checked = false;
    location.reload()
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

  // Update Form
  const formModal = document.querySelector('.modal') as HTMLElement
  const editForm = document.querySelector('.edit-task-form') as HTMLFormElement
  const editButtons = document.querySelectorAll('.edit-icon')

  const editTask = document.getElementById('edit-tasktext') as HTMLInputElement
  const editDay = document.getElementById('edit-taskday') as HTMLInputElement
  const editReminder = document.getElementById('edit-reminder') as HTMLInputElement


  let taskId: string

  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      // extract the task details to populate form edit
      const listItem = button.parentElement as HTMLElement
      const taskText = listItem?.querySelector('h4')?.textContent as string
      const taskDay  = listItem?.querySelector('p')?.textContent?.replace('Due Day:', '').trim() as string 

      // Populate the form fields
      editTask.value = taskText
      editDay.value = taskDay
      editReminder.checked = true
      taskId = listItem.getAttribute('data-task-id') as string

      // Show the edit form modal
      formModal.style.display = 'block'
    })
  })



  // edit form submission to update the task
  editForm.addEventListener('submit', (e :Event) => {
    e.preventDefault()

    const taskToEdit = tasks.find(task => task.id === taskId)

    if(taskToEdit) {
      taskToEdit.task = editTask.value
      taskToEdit.day = editDay.value
      taskToEdit.reminder = editReminder.checked
    }

    const taskIndex = tasks.findIndex(task => task.id === taskId)
    if(taskIndex !== -1 && taskToEdit) {
      // Edit the task 
      tasks[taskIndex] = taskToEdit

      // Update Local Storage
      saveTasks()

      // Find the existing list item for the task
      const existingListItem = document.querySelector(`li[data-task-id="${taskId}]`) as HTMLLIElement
      
      if(existingListItem) {
        // Update the content of existing list item
        const h4 = existingListItem.querySelector('h4')
        const p = existingListItem.querySelector('p')
        const p2 = existingListItem.querySelectorAll('p')[1]

        if(h4 && p && p2) {
          h4.innerText = editTask.value
          p.innerText = `Due Day: ${editDay.value}`
          p2.innerText = `Need to do ${editTask.value} at ${editDay.value}`
        }
      }
    }
    // Hide the edit form modal
    formModal.style.display = 'none'
    location.reload()
  })