window.addEventListener('load', function () {
    var todoList = $('#todo-list');
    $(function(){
        $('#add-press').on('click', addTodoItem);
        $(document).on('click', '.del-item', deleteItem);
        $(document).on('click', '.text-todo', selectItem);
        $(document).on('click', '.edit-item', editItem);
    });

    function saveToLocSt() {
        var saveTodo = todoList.html();
        localStorage.setItem('loc', saveTodo);
    }
    if (localStorage.getItem('loc')) {
        todoList.html(localStorage.getItem('loc'));
    }

    function addTodoItem() {
        var addItem = $('#todo-enter').val();
        if(addItem !== '') {
            todoList.prepend('<li class="box">' + '<span class="text-todo">' + addItem + '</span>'
                + '<button class="edit-item">Edit</button>'
                + '<button class="del-item">X</button>'
                + '</li>');
            $('#todo-enter').val('');
        }else {
            alert('write something');
        }
        var i = 0;
        $(".text-todo").each(function(){
            $(this).attr("id","id_"+i);
            i++;
        });
        saveToLocSt();
        counter();
    }

    $('#todo-enter').keyup(function(e){
        if (e.keyCode === 13) {
            addTodoItem();
        }
    });
    function selectItem() {
        $(this).toggleClass("checked");
        saveToLocSt();
        counter();
    }

    function deleteItem() {
        $(this).parent().remove();
        saveToLocSt();
        counter();
    }

    function editItem(){
        $('#copyLi').val($(this).siblings('span').text());
        $('#edit').css('display', 'block');
        //var spanID = $(this).siblings('span').attr('id');
        $('#save').on('click', function (){
            // сейв непрацює....треба доробити...покищо рішення не знайшов
            // var saveI = $('#edit-input').val();
            // $(spanID).text(saveI);
            $('#edit').css('display', 'none');
            saveToLocSt();
        });

        $('#cancel').on('click', function (){
            $('#edit').css('display', 'none');
        });
    }

    function counter() {
        var notDoneItem = $('li').length;
        var doneItem = $('.checked').length;
        $('#counterOfNotDone').text(notDoneItem - doneItem);
        $('#counter').text(doneItem);
    }
    counter();
    todoList.sortable();
    todoList.on('sortstop', saveToLocSt);
});