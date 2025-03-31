const inputField = document.getElementById("task_name");
const todoField = document.getElementById("task_list_todo");
const progressField = document.getElementById("task_list_progress");
const doneField = document.getElementById("task_list_done");
var taskAmount = 0

// Aufgabe hinzufügen
function addTask() {
    if (inputField.value === "") {
        alert("Bitte Task hinzufügen")
    }
    else {
        let newTask = document.createElement("li");
        newTask.innerHTML = inputField.value;
        newTask.setAttribute("class", "task_object");
        newTask.setAttribute("draggable", "true");
        newTask.setAttribute("id", "task_number"+taskAmount);
        newTask.setAttribute("ondragstart", "drag(event)");
        todoField.appendChild(newTask);
        document.getElementById("task_form").style.display = "none";
        taskAmount = taskAmount + 1;
    }
    inputField.value = "";
    saveData();
}

// Aufgaben im Lokalen Speicher speichern und laden
function saveData() {
    localStorage.setItem("todoData", todoField.innerHTML);
    localStorage.setItem("progressData", progressField.innerHTML);
    localStorage.setItem("doneData", doneField.innerHTML);
    localStorage.setItem("amountOfTasks", taskAmount);
}

function loadData() {
    todoField.innerHTML = localStorage.getItem("todoData");
    progressField.innerHTML = localStorage.getItem("progressData");
    doneField.innerHTML = localStorage.getItem("doneData");
    taskAmount = localStorage.getItem("amountOfTasks");
}

loadData();

// Anzeigen und verstecken vom Eingabefenster
function showForm() {
    document.getElementById("task_form").style.display = "block";
}

function hideForm() {
    document.getElementById("task_form").style.display = "none";
}

// Drag & Drop Funktionen
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("html", ev.target.id)
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("html");
    ev.target.appendChild(document.getElementById(data));
    saveData();
}

function dropDelete(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("html");
    document.getElementById(data).remove();
    saveData();
}