let onWindowLoad = () =>
{
    let mainTasks = document.querySelector('.main__tasks');

    /* Local storage */

    let allTasksInStorage = [];

    var loadAllInformation = () =>
    {
    	if (!allTasksInStorage)
    		return;

        let length = allTasksInStorage.length;

        for (let i = 0; i < length; i++)
        {
            let task = createNewTask(allTasksInStorage[i]);
            mainTasks.appendChild(task);
        }
    }

    if (localStorage.getItem('tasksProgram') != undefined)
    {
        allTasksInStorage = JSON.parse(localStorage.getItem('tasksProgram')) || [];

        loadAllInformation();

        let preloader = document.querySelector('.preloader');

        setTimeout(() =>
        {            
            preloader.classList.remove('preloader-active');
        }, 800);

        setTimeout(() =>
        {
            preloader.remove();
        }, 1200);
    }

    var saveAllInformation = () =>
    {
        localStorage.setItem('tasksProgram', JSON.stringify(allTasksInStorage));
    }

    function addTaskToStorage(task)
    {
        allTasksInStorage.push(task);
    }

    var onWindowBeforeUnload = (event) =>
    {
        saveAllInformation();
    }

    var deleteTaskFromStorage = (task) =>
    {
        let length = allTasksInStorage.length;

        for (let i = 0; i < length; i++)
        {
            if (allTasksInStorage[i] === task)
            {
                allTasksInStorage.splice(i, 1);

                break;
            }
        }
    }

    var changeTaskFromStorage = (oldTask, newTask) =>
    {
        let length = allTasksInStorage.length;

        for (let i = 0; i < length; i++)
        {
            if (allTasksInStorage[i] === oldTask)
            {
                allTasksInStorage[i] = newTask;

                break;
            }
        }
    }

    window.addEventListener('beforeunload', onWindowBeforeUnload);

    /* Сообщение */

    let message = document.querySelector('.message');
    let messageTask = document.querySelector('.message__text');
    let messageHideButton = document.querySelector('.message__hide');
    let messageTime = document.querySelector('.message__time');
    let messageTimeInterval;
    let messageFadeOutTimeout;

    let fadeoutMessage = () =>
    {
        message.classList.remove('message-active');
        clearInterval(messageTimeInterval);
        clearTimeout(messageFadeOutTimeout);
    }   

    let changeTimeMessage = () =>
    {
        if (messageTime.textContent === "1")
        {
            clearInterval(messageTimeInterval);
        }

        messageTime.textContent -= 1;
    }
    
    let showMessage = (text) =>
    {
        if (messageFadeOutTimeout)
            clearTimeout(messageFadeOutTimeout);

        if (message.classList.contains('message-active'))
        {
            clearTimeout(messageFadeOutTimeout);
            clearInterval(messageTimeInterval);
        }
        else
        {
            message.classList.add('message-active');
        }

        messageTime.textContent = 5;
        messageTask.textContent = text;

        messageTimeInterval = setInterval(changeTimeMessage, 1000);
        messageFadeOutTimeout = setTimeout(fadeoutMessage, 5000);
    }

    let onMessageHideClick = () =>
    {
        fadeoutMessage();
    }

    messageHideButton.addEventListener('click', onMessageHideClick);

    /* Вызов модального окна */

    let modal = document.querySelector('.modal');
    let addingButton = document.querySelector('.icons__add');
    let addingModal = document.querySelector('.modal');
    let adding = document.querySelector('.modal__adding');
    let addingClose = document.querySelector('.adding__close');

    let addingInput = document.querySelector('.adding__input');

    let addingTaskButton = document.querySelector('.adding__button');

    let onAddButtonClick = () =>
    {
        addingModal.style.display = "block";
        setTimeout(() =>
        {
            addingModal.classList.add('active');
            adding.classList.add('active');
        }, 20);

        addingInput.focus();
    }
    
    let onCloseButtonClick = () =>
    {
        adding.classList.remove('active');
        addingModal.classList.remove('active');
        setTimeout(() =>
        {
            addingModal.style.display = "";
        }, 300);
    }

    let onModalClick = (event) =>
    {
        if (event.target.classList.contains('modal'))
        {
            onCloseButtonClick();
        }
    }

    addingButton.addEventListener('click', onAddButtonClick);
    addingClose.addEventListener('click', onCloseButtonClick);
    modal.addEventListener('click', onModalClick);

    /* Вызов модального окна нажатием клавиши q */

    let onWindowKeydown = (event) =>
    {
        if (event.code === "KeyQ")
        {
            if (addingModal.classList.contains('active'))
            {
                onCloseButtonClick();
            }
            else
            {
                onAddButtonClick();
            }
        }
    }

    window.addEventListener('keydown', onWindowKeydown);

    /* Добавление задачи */

    function createNewTask(someTask)
    {
        let task = document.createElement('div');
        task.classList.add('task');

        let circle = document.createElement('span');
        circle.classList.add('task__circle');

        let img = document.createElement('img');
        img.setAttribute('class', 'task__check');
        img.setAttribute('src', 'img/check.png');
        img.setAttribute('alt', '');

        circle.appendChild(img);

        let text = document.createElement('p');
        text.className = "task__text";
        text.textContent = someTask;

        task.appendChild(circle);
        task.appendChild(text);

        return task;
    }

    let addNewTask = (task) =>
    {
        mainTasks.appendChild(task);

        showMessage('Created 1 task');
    }

    let onAddingTaskButtonClick = (event) =>
    {
        if (addingInput.value !== "")
        {
            addNewTask(createNewTask(addingInput.value));

            addTaskToStorage(addingInput.value);

            addingInput.value = "";
        }

        onCloseButtonClick();

        event.preventDefault();
    }

    addingTaskButton.addEventListener('click', onAddingTaskButtonClick);

    /* Выполнение таска */

    let onMainTasksClick = (event) =>
    {
        if (event.target.classList.contains('task__circle') ||
            event.target.classList.contains('task__check'))
            {
                let task = event.target.closest('.task').querySelector('.task__text').textContent;
                deleteTaskFromStorage(task);
                mainTasks.removeChild(event.target.closest('.task'));

                showMessage('Done!');
            }
    }

    mainTasks.addEventListener('click', onMainTasksClick);

    /* Добавление новой задачи в main */

    let mainAddition = document.querySelector('.main__addition');
    let mainAdding = document.querySelector('.main__adding');
    let additionInput = document.querySelector('.addition__input');

    let onMainAddingClick = () =>
    {
        mainAddition.style.display = "block";
        additionInput.focus();
    }

    mainAdding.addEventListener('click', onMainAddingClick);

    let additionButton = document.querySelector('.addition__button'); 

    let onAdditionButtonClick = (event) =>
    {
        if (additionInput.value === "")
            return;
    
        addNewTask(createNewTask(additionInput.value));

        addTaskToStorage(additionInput.value);

        additionInput.value = "";
        mainAddition.style.display = "";

        if (event)
            event.stopPropagation();
    }

    additionButton.addEventListener('click', onAdditionButtonClick);

    let additionCancel = document.querySelector('.addition__cancel');

    let onAdditionCancelClick = () =>
    {
        mainAddition.style.display = "";
        additionInput.value = "";

        event.stopPropagation();
    }

    additionCancel.addEventListener('click', onAdditionCancelClick);

    /* Нажатие энтера в инпуте при добавлении task */

    let onAdditionInputKeydown = (event) =>
    {
        if (event.key === 'Enter')
        {
            onAdditionButtonClick();
        }

        event.stopPropagation();
    }

    let onAddingInputKeydown = (event) =>
    {
        if (event.key === 'Enter')
        {
            onAddingTaskButtonClick();
        }

        event.stopPropagation();
    }

    additionInput.addEventListener('keydown', onAdditionInputKeydown);
    addingInput.addEventListener('keydown', onAddingInputKeydown);

    /* Изменение task */

    let isChangeBlockExists = false;

    let onChangeButtonClick = (event) =>
    {
        let changeInput = document.querySelector('.change__input');
        
        if (changeInput.value !== '')
        {
            let text = event.target.closest('.task').querySelector('.task__text');

            changeTaskFromStorage(text.textContent, changeInput.value);
            
            text.textContent = changeInput.value;

            showMessage("Successfully");
        }
        else 
        {
            showMessage("Something goes wrong");
        }

        onCancelChangeClick();
    }

    let onChangeInputKeydown = (event) => 
    {
        if (event.code === 'Enter')
            onChangeButtonClick(event);

        event.stopPropagation();
    }

    let onCancelChangeClick = () =>
    {
        document.querySelector('.change').remove();

        isChangeBlockExists = false;

        event.stopPropagation();
    }

    let isCheckingBlockExists = () =>
    {
        if (isChangeBlockExists)
        {
            onCancelChangeClick();
        }
    }

    let editTask = (currentTask) =>
    {
        if (!currentTask)
                return;

        isCheckingBlockExists();

        isChangeBlockExists = true;

        let element = `<div class="change">
                            <input type="text" class="change__input input-text" name="">
                            <a class="change__button button" href="#">Save</a>
                            <span class="change__cancel">Cancel</span>
                        </div>`
        currentTask.insertAdjacentHTML('beforeend', element);

        let changeInput = document.querySelector('.change__input');
        changeInput.value = currentTask.querySelector('.task__text').textContent;

        changeInput.addEventListener('keydown', onChangeInputKeydown);

        let changeButton = document.querySelector('.change__button');
        changeButton.addEventListener('click', onChangeButtonClick);

        document.querySelector('.change__cancel').addEventListener('click', onCancelChangeClick);
        document.querySelector('.change__input').focus();        
    }

    let onChangeMainTasksClick = (event) =>
    {
        if (event.target.classList.contains('task') || 
            event.target.classList.contains('task__text'))
        {
            let currentTask = event.target.closest('.task');

            editTask(currentTask);

            event.stopPropagation();
        }
    }

    let contextmenu = document.querySelector('.contextmenu');

    let onDocumentClick = (event) =>
    {
        if (isChangeBlockExists && !event.target.parentElement.classList.contains('change') &&
            !event.target.classList.contains('change'))
        {
            document.querySelector('.change').remove();
            isChangeBlockExists = false;
        }

        if (contextmenu.style.display === 'block')
        {
            contextmenu.style.display = "";
        }
    }

    document.addEventListener('click', onDocumentClick);
    mainTasks.addEventListener('click', onChangeMainTasksClick);

    /* Контекстное меню для task */

    let contextmenuTask;
    let contextmenuEdit = document.querySelector('.contextmenuEdit');
    let contextmenuDelete = document.querySelector('.contextmenuDelete')

    let onContextmenuEditClick = (event) =>
    {
        editTask(contextmenuTask);

        event.stopPropagation();

        contextmenu.style.display = "none";
    }

    let onContextmenuDeleteClick = (event) =>
    {
        deleteTaskFromStorage(contextmenuTask.querySelector('.task__text').textContent);
        mainTasks.removeChild(contextmenuTask);

        showMessage('Deleted!');        

        contextmenu.style.display = "none";
        
        event.stopPropagation();
    }

    let onMainTasksContextmenu = (event) =>
    {
        if (event.target.classList.contains('task') || 
            event.target.classList.contains('task__text'))
        {
            contextmenuTask = event.target.closest('.task');
            
            contextmenu.style.display = "block";
            contextmenu.style.top = event.clientY + "px";
            contextmenu.style.left = event.clientX + "px";
        }

        event.preventDefault();
    }

    contextmenuEdit.addEventListener('click', onContextmenuEditClick);
    mainTasks.addEventListener('contextmenu', onMainTasksContextmenu);
    contextmenuDelete.addEventListener('click', onContextmenuDeleteClick);
}

window.addEventListener('load', onWindowLoad);