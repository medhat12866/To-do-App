let taskInput = document.getElementById("taskInput");
let createBtn = document.getElementById("createBtn");
let taskList = document.getElementById("taskList");
let list = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditing = false;
let currentIndex = null;


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(list));
}


function clearInput() {
  taskInput.value = "";
}


function showTasks() {
  taskList.innerHTML = "";
  list.forEach((task, index) => {
    let taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <p>${task}</p>
      <span>
        <i onclick="updateTask(${index})" class="fa-solid fa-pen update"></i>
        <i onclick="removeTask(${index})" class="fa-solid fa-trash-can delete"></i>
      </span>
    `;
    taskList.appendChild(taskItem);
  });
}


function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("لا يمكن إضافة مهمة فارغة!");
    return;
  }

  if (isEditing) {
    list[currentIndex] = taskText; 
    createBtn.textContent = "إضافة"; 
    isEditing = false;
    currentIndex = null;
  } else {
    list.push(taskText); 
  }

  saveTasks();
  showTasks();
  clearInput();
}


function removeTask(index) {
  list.splice(index, 1);
  saveTasks();
  showTasks();
}

function updateTask(index) {
  taskInput.value = list[index];
  createBtn.textContent = "تحديث";
  isEditing = true;
  currentIndex = index;
}

showTasks();

