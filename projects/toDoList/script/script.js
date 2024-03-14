let toDoList = JSON.parse(localStorage.getItem('todo-list-json')) || [];

document.addEventListener('DOMContentLoaded',
    function () {
        var fromDate = document.getElementById('js-todo-date-input');
        var toDate = document.getElementById('toDate');
        var today = new Date();
        fromDate.value = today.toISOString().split('T')[0];
    }
);

function renderTodoList() {

    let todoListRows = window.document.getElementById('js-todo-list-rows');
    let todoListRowsHtml = '';

    for (let i=0; i<toDoList.length; i++) {
        let newRow = window.document.createElement('div');
        newRow.setAttribute('class', 'todo-list-row');

        let todoName = window.document.createElement('span');
        todoName.setAttribute('class', 'todo-name');
        todoName.textContent = toDoList[i].name;

        let todoDate = window.document.createElement('span');
        todoDate.setAttribute('class', 'todo-date');
        todoDate.textContent = toDoList[i].date;

        let deleteButton = window.document.createElement('button');
        deleteButton.setAttribute('class', 'todo-delete-button');
        deleteButton.setAttribute('onclick', deleteRecord(${i}));
        deleteButton.textContent = 'Delete';

        newRow.appendChild(todoName);
        newRow.appendChild(todoDate);
        newRow.appendChild(deleteButton);

        todoListRowsHtml += newRow.outerHTML;
    }

    todoListRows.innerHTML = todoListRowsHtml;
    localStorage.setItem('todo-list-json', JSON.stringify(toDoList));
}

function addToList() {
    let name = document.getElementById('js-todo-name-input').value;
    let date = document.getElementById('js-todo-date-input').value;

    toDoList.push({name, date});
    renderTodoList();
}

function deleteRecord(index) {
    toDoList.splice(index, 1);
    renderTodoList();
}

renderTodoList();