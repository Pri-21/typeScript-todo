import {v4 as uuidV4} from "uuid"

// create type task
type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

//grab the elements first
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();

//render saved tasks to the page
tasks.forEach(addListItem)

//add event listener
form?.addEventListener("submit", e => {
  e.preventDefault()

  //checks our input
  if(input?.value == "" || input?.value == null) return
  
  //create task
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  input.value = "";
})
//adding tasks to the list
function addListItem(task :Task) {

  //create the list elements
   const item = document.createElement("li");
   const label = document.createElement("label");
   const checkbox = document.createElement("input");

   // changes the completed value in our task, when the checkbox is changed
   checkbox.addEventListener("change", e => {
    task.completed = checkbox.checked;
    saveTasks();
  });

   checkbox.type = "checkbox";
   checkbox.checked = task.completed;

  //append the items to form the list
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item)

}

//function to save tasks to local storage
function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
};

//load the saved tasks
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if(taskJSON == null ) return []
  return JSON.parse(taskJSON)
}

