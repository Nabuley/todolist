//macker: 노윤호
var _mess="good";
window.onload = function() {
    var userName = localStorage.getItem('user_name');
    var todoList = JSON.parse(localStorage.getItem('todo_list')) || [];
    if (userName) {
        document.getElementById('user_name').value = userName;
        document.getElementById('title').querySelector('span').textContent = userName + '의 To-Do List';
    }

    todoList.forEach(function(todo) {
        addTodoItem(todo.text, todo.done);
    });

    document.getElementById('add-button').onclick = function() {
        addTodoItem();
        updateProgress(); /* 항목 추가 시 게이지 업데이트 */
    };

    document.getElementById('reset-button').onclick = function() {
        localStorage.removeItem('todo_list');
        document.getElementById('todo-container').innerHTML = '';
        addTodoItem();
        updateProgress(); /* 항목 초기화 시 게이지 업데이트 */
    };

    document.getElementById('ending').onclick = function() {
        updateProgress();
        alert(_mess);
    };

    document.getElementById('user_name').onchange = function() {
        document.getElementById('title').querySelector('span').textContent = this.value + '의 To-Do List';
        localStorage.setItem('user_name', this.value);
    };

    updateProgress();
};

function addTodoItem(text = '', done = false) {
    var todoContainer = document.getElementById('todo-container');
    var newTodoItem = document.createElement('div');
    newTodoItem.className = 'todo-item';

    var newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.className = 'todo-checkbox';
    newCheckbox.checked = done;
    newCheckbox.onchange = function() {
        saveTodoList();
        updateProgress();
    };

    var newTextbox = document.createElement('input');
    newTextbox.type = 'text';
    newTextbox.className = 'todo-text';
    newTextbox.value = text;
    newTextbox.onchange = function() {
        saveTodoList();
        updateProgress(); /* 텍스트 변경 시 게이지 업데이트 */
    };

    var deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        todoContainer.removeChild(newTodoItem);
        saveTodoList();
        updateProgress();
    };

    newTodoItem.appendChild(newCheckbox);
    newTodoItem.appendChild(newTextbox);
    newTodoItem.appendChild(deleteButton);
    todoContainer.appendChild(newTodoItem);
}

function saveTodoList() {
    var todoItems = Array.from(document.getElementsByClassName('todo-item'));
    var todoList = todoItems.map(function(item) {
        return {
            text: item.getElementsByClassName('todo-text')[0].value,
            done: item.getElementsByClassName('todo-checkbox')[0].checked
        };
    });

    localStorage.setItem('todo_list', JSON.stringify(todoList));
}

function updateProgress() {
    var todoItems = Array.from(document.getElementsByClassName('todo-item'));
    var doneItems = todoItems.filter(function(item) {
        return item.getElementsByClassName('todo-checkbox')[0].checked;
    });
    var progress = Math.round(doneItems.length / todoItems.length * 100);
    if(progress===0){
        _mess="You didn't even start what you were going to do.";
    }
    else if(progress<=20){
        _mess="You're kidding me, right? That's your starting point!";
    }
    else if(progress<=40){
        _mess="I think this is your best starting point";
    }

    else if(progress<=70){
        _mess="Now you've got half of your work to do. Keep going";
    }
    else if(progress===88){
        _mess="Whoa, an Easter Egg! Hm.. Well, if I were in your shoes, I'll ask me like this: 'Hello, maker! What is your name?' and I'll answer this question like this: 'Hello, user? Thank you for using this website! Not every user finds this message, so I think you're very lucky! Okey, let's reset. Hello, lucky user? I'll answer your question. First, my name is...더보기"//maker=Nabuley
    }
    else if(progress<100){
        _mess="Almost There!";
    }
    else if(progress===100){
        _mess="Well done! You've finished everything!!"
    }

    document.getElementById('progress').style.backgroundSize = isNaN(progress) ? '0% 100%' : progress + '% 100%';
    document.getElementById('progress').textContent = isNaN(progress) ? '0%' : progress + '%';
    //document.getElementById('progress').querySelector('.blue').style.width = isNaN(progress) ? '0%' : progress + '%';
    //document.getElementById('progress').querySelector('::before').style.width = isNaN(progress) ? '0%' : progress + '%'; /* 게이지의 너비를 변경하여 파란색으로 채워지게 수정 */
}