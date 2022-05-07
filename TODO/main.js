(function () {
    //create and retur app  title
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;
    }

    //create and return form for creating TODO list
    function createTodoItemForm() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Веедите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        form.append(input);
        buttonWrapper.append(button);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    //create and return TDO list elements
    function createTodoList() {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    }

    //create and return list element
    function createTodoItem(name, done) {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');

        item.classList.add(
            'list-group-item',
            'd-flex',
            'justify-content-between',
            'align-items-center'
        );
        doneButton.classList.add('btn', 'btn-success');
        deleteButton.classList.add('btn', 'btn-danger');
        buttonGroup.classList.add('btn-group', 'btn-group-sm');

        if (done) {
            item.classList.add('list-group-item-success');
        }

        item.textContent = name;
        doneButton.textContent = 'Готово';
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    //get array for local storage
    function getLocalArray() {
        let li = document.querySelectorAll('.list-group-item');
        array = [];
        for (i = 0; i < li.length; i++) {
            // console.log(li[i].classList.contains("list-group-item-success"));
            if (li[i].classList.contains('list-group-item-success')) {
                array.push({
                    name: li[i].childNodes[0].textContent,
                    done: true,
                });
            } else
                array.push({
                    name: li[i].childNodes[0].textContent,
                    done: false,
                });
        }

        return array;
    }

    //TODO app function
    function createTodoApp(container, title = 'Список  дел', array, key) {
        // let array = JSON.parse(localStorage.getItem('array'));
        let todoTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        container.append(todoTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        //adding dids
        if (array && array.length > 0) {
            for (i = 0; i < array.length; i++) {
                let item = array[i];
                let todoItem = createTodoItem(item.name, item.done);
                todoItem.doneButton.addEventListener('click', function () {
                    todoItem.item.classList.toggle('list-group-item-success');
                    localStorage.setItem(key, JSON.stringify(getLocalArray()));
                });

                todoItem.deleteButton.addEventListener('click', function () {
                    if (confirm('Вы уверены?')) {
                        todoItem.item.remove();
                        localStorage.setItem(key, JSON.stringify(getLocalArray()));
                    }
                });

                todoList.append(todoItem.item);
            }
        }
        //empty-form check
        todoItemForm.button.disabled = true;

        todoItemForm.form.addEventListener('input', function () {
            if (todoItemForm.input.value == '') {
                todoItemForm.button.disabled = true;
            } else todoItemForm.button.disabled = false;
        });

        //submit adding item
        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success');

                localStorage.setItem(key, JSON.stringify(getLocalArray()));
            });

            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove();
                    localStorage.setItem(key, JSON.stringify(getLocalArray()));
                }
            });

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';
            todoItemForm.button.disabled = true;
            localStorage.setItem(key, JSON.stringify(getLocalArray()));

            // console.log(localArray);
        });
    }

    //main body
    document.addEventListener('DOMContentLoaded', function () {
        createTodoApp(
            document.getElementById('my-todo'),
            'Список дел',
            JSON.parse(localStorage.getItem('array')),
            'array'
        );
    });

    // window.createTodoApp = createTodoApp;
})();
