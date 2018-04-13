/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */

let homeworkContainer = document.querySelector('#homework-container');



var addFormWrap = document.createElement('form');

(function(){
    var tableWrap = document.createElement('table');
    tableWrap.setAttribute('id', 'list-table');
    homeworkContainer.appendChild(tableWrap);
} ());

(function(){
    homeworkContainer.appendChild(addFormWrap);
    var addName = document.createElement('input');
    var addValue = document.createElement('input');
    var addBtn = document.createElement('input');

    addName.setAttribute('id', 'add-name-input');
    addValue.setAttribute('id', 'add-value-input');
    addBtn.setAttribute('id', 'add-button');

    homeworkContainer.appendChild(addName);
    homeworkContainer.appendChild(addValue);
    homeworkContainer.appendChild(addBtn);

    homeworkContainer.querySelector('#add-button').addEventListener('click', function(e) {
        createExpiredCookie(addNameInput.value, addValueInput.value, 10 );
    });

} ());



let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');


function createExpiredCookie(name, value, expires) {
    // +1 день от текущего момента
    var date = new Date;
    date.setDate(date.getDate() + expires);
    //console.log(date.toUTCString() );
    document.cookie=name + '=' + value + '; expires=' + date.toUTCString();
    document.body.querySelector('.CookieList').textContent = document.cookie;


    if (document.body.querySelector('#filter-name-input').value == '') {
        yourCookie();
    }
    else {

        let combinedCookie = name + '=' + value;

        var wordPart = document.body.querySelector('#filter-name-input').value;
        var regex = new RegExp(wordPart, 'i');
        if (combinedCookie.match(regex) ) {
            filterKeyUp();
        }
        else {
            console.log('Добавляемая куки ' + combinedCookie + ' НЕ соответствует фильтру ' + wordPart);
            filterKeyUp();
        }

    }

}


function yourCookie() {
    var cookie = document.cookie.split('; ');
    createList(cookie);

}

yourCookie() ;

/*
 * Teable creating
 *
 */

function createList(array) {
    console.log('create list работает');
    listTable.innerHTML = null; // Refresh list

    array.forEach(function(item, i) {
        console.log(item);
        var trLine = document.createElement('tr')
        listTable.appendChild(trLine);

        var newLine = item.split('=');
        newLine.forEach(function(item, i,) {
            var trCol = document.createElement('td')
            trCol.textContent = item;
            trLine.appendChild(trCol);
            //console.log(item);
        })

        var trLastCol = document.createElement('td');
        var delBut =  document.createElement('button');
        delBut.setAttribute('class', 'delButton');
        delBut.setAttribute('data-delete', newLine[0]);
        delBut.textContent = 'Удалить куки';
        trLine.appendChild(trLastCol);
        trLastCol.appendChild(delBut);

    })
}





filterNameInput.addEventListener('keyup', function() {
});

addButton.addEventListener('click', () => {
});
