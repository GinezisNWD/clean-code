var taskInput = document.getElementById("new-task");
var addButton = document.querySelector('.add-tasks__button');
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {

	var listItem = document.createElement("li");
	listItem.classList.add('todo-item');

	var checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.classList.add('todo-item__checkbox');

	var label = document.createElement("label");
	label.innerText = taskString;
	label.classList.add('todo-item__label', 'todo-item-container');

	var editInput = document.createElement("input");
	editInput.type = "text";
	editInput.classList.add('todo-item__input', 'primary-input', 'todo-item-container');

	var editButton = document.createElement("button");
	editButton.innerText = "Edit";
	editButton.classList.add('primary-button', 'todo-item__edit-button');

	var deleteButton = document.createElement("button");
	var deleteButtonImg = document.createElement("img");
	deleteButtonImg.src = './remove.svg';
	deleteButton.appendChild(deleteButtonImg);
	deleteButton.classList.add('todo-item__delete-button', 'primary-button', 'delete-button');

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}

var addTask = function () {
	if (!taskInput.value) return;
	var listItem = createNewTaskElement(taskInput.value);

	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}

var editTask = function () {
	var listItem = this.parentNode;

	var editInput = listItem.querySelector('.todo-item__input');
	var label = listItem.querySelector(".todo-item__label");
	var editBtn = listItem.querySelector(".todo-item__edit-button");
	var containsClass = listItem.classList.contains("todo-item_edit-mode");
	if (containsClass) {
		label.innerText = editInput.value;
		editBtn.innerText = "Edit";
	} else {
		editInput.value = label.innerText;
		editBtn.innerText = "Save";
	}

	listItem.classList.toggle("todo-item_edit-mode");
};

var deleteTask = function () {
	var listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
}

var taskCompleted = function () {
	var listItem = this.parentNode;
	listItem.classList.add('todo-item_completed')
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete = function () {
	var listItem = this.parentNode;
	listItem.classList.remove('todo-item_completed')
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	var checkBox = taskListItem.querySelector(".todo-item__checkbox");
	var editButton = taskListItem.querySelector(".todo-item__edit-button");
	var deleteButton = taskListItem.querySelector(".todo-item__delete-button");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}