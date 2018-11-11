/*********** CREATE DOM ELEMENTS *************/
const createSpanWithXIcon = function() {
  const spanWithIcon =  document.createElement('span');
  spanWithIcon.classList.add('delete-x-icon');
  spanWithIcon.setAttribute('aria-hidden', 'true');
  spanWithIcon.textContent = 'x';

  return spanWithIcon;
}

const createDeleteTaskBtnEl = function() {
  const deleteTaskBtn = document.createElement('button');
  deleteTaskBtn.classList.add('close');
  deleteTaskBtn.type = 'button';

  deleteTaskBtn.append(createSpanWithXIcon());
  return deleteTaskBtn;
}

const createTaskListEl = function(taskInput='Wash the dog') {
  const newTask = document.createElement('li');
  newTask.classList.add('list-group-item');
  newTask.textContent = taskInput;
  newTask.append(createDeleteTaskBtnEl());

  return newTask;
}

/*********** Functionality with Task List *************/
const addNewTaskToList = function(e) {
  const taskInput= document.querySelector('#new-task-input');
  const taskInputValue = taskInput.value.trim();

  // alert then return if the new task field is empty
  if (taskInputValue === '') {
    alert('Input a New Task!');
    return;
  }

  // reset input field
  taskInput.value = '';
  taskList.append(createTaskListEl(taskInputValue));
  arrTaskListForStorage.push(taskInputValue);
  
  localStorage.setItem('taskList', JSON.stringify(arrTaskListForStorage));

  e.preventDefault();
}

const removeTaskFromList = function(e) {
  const taskToRemove = e.target.parentElement.parentElement; 
  const clickedOnXIcon = Array.from(taskToRemove.classList).includes('list-group-item');
  if (clickedOnXIcon) {
    taskList.removeChild(taskToRemove);
    // remove x off of end
    taskListText = taskToRemove.textContent.slice(0,-1);
    const indexOfTaskToRemove = arrTaskListForStorage.indexOf(taskListText);
    
    arrTaskListForStorage.splice(indexOfTaskToRemove, 1);
    localStorage.setItem('taskList', JSON.stringify(arrTaskListForStorage));
  }
}

const clearList = function() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  arrTaskListForStorage.length = 0;
  localStorage.setItem('taskList', JSON.stringify(arrTaskListForStorage));
}

const filterTasks = function(e) {
  const filterInput = e.target.value; 
  const tasks = document.querySelectorAll('.list-group-item')
  tasks.forEach(function(task) {
    const taskListText = task.textContent.slice(0,-1);
    if(taskListText.includes(filterInput)) {
      task.classList.remove('hide');
      task.classList.add('show');
    }
    else {
      task.classList.remove('show');
      task.classList.add('hide');
    }
  })
}

/*********** GLOBAL VARS INIT*************/
// The task list html dom
const taskList = document.querySelector('#task-list');
// the task list for storage in array
let arrTaskListForStorage = JSON.parse(localStorage.getItem('taskList'));
// Set up List from local storage
if(arrTaskListForStorage) {
  arrTaskListForStorage.forEach(task => {
    taskList.append(createTaskListEl(task));
  });
}
else {
  arrTaskListForStorage = [];
}

/*********** Event Listeners *************/
const addToListBtn = document.querySelector('#add-to-list-btn');
addToListBtn.addEventListener('click', addNewTaskToList);
taskList.addEventListener('click', removeTaskFromList);
const clearListBtn = document.querySelector('#clear-list-btn');
clearListBtn.addEventListener('click', clearList);
const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('input', filterTasks);
