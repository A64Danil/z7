0/**
 * Created by Danil on 27.02.2018.
 */

console.log("NODE JS are working. Тест русских символов");

var newWin;

let listTable = document.body.querySelector('#list-table tbody');

document.body.querySelector('.openNew').addEventListener('click', function () {
    createWindow('test', 600, 400);
});

document.body.querySelector('.closeNew').addEventListener('click', function () {
    closeWindow(newWin);
});

document.body.querySelector('.showCookie').addEventListener('click', function () {
    document.body.querySelector('.CookieList').textContent = document.cookie;
});

document.body.querySelector('.saveCookie').addEventListener('click', function () {
    var date = new Date;
    createCookie('myNewCookie', date.getSeconds());
});

document.body.querySelector('.deleteCookie').addEventListener('click', function () {
    deleteCookie('myNewCookie');
});

document.body.querySelector('.setTestedCookie').addEventListener('click', function () {
    createExpiredCookie('Ферваль', '28 дней', 1);
    createExpiredCookie('Март', '31 день', 1);
    createExpiredCookie('Апрель', '30 дней', 1);
});


var addNameInput = document.body.querySelector('#add-name-input');
var addValueInput = document.body.querySelector('#add-value-input');

document.body.querySelector('#add-button').addEventListener('click', function(e) {
    e.preventDefault();
    createExpiredCookie(addNameInput.value, addValueInput.value, 10 );
});

document.body.querySelector('#filter-name-input').addEventListener('keyup', filterKeyUp);

document.body.addEventListener('click', function(e) {
    var el = e.target;
    if (el.className == 'delButton') {
        deleteCookie(el.getAttribute('data-delete'))
        console.log('Куки по имени ' + el.getAttribute('data-delete') + ' удалено, обновляем таблицу');
        yourCookie();
    }
})


function createWindow(name, width, height) {
    var params = 'height='+height+',width='+width;
    newWin = window.open('test.html', name, params)
    newWin.focus();
}

function closeWindow(window) {
    window.close();
}


/**
 * Функция должна создавать cookie с указанными именем и значением
 *
 * @param name - имя
 * @param value - значение
 */
function createCookie(name, value) {
    document.cookie=name + '=' + value;
    document.body.querySelector('.CookieList').textContent = document.cookie;
}

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
            alert('Куки добавлена');
            console.log('Добавляемая куки ' + combinedCookie + ' НЕ соответствует фильтру ' + wordPart);
            filterKeyUp();
        }


        //alert('в поле не пусто, там ' + document.body.querySelector('#filter-name-input').value);
    }

}




/**
 * Функция должна удалять cookie с указанным именем
 *
 * @param name - имя
 */
function deleteCookie(name) {
    createExpiredCookie(name, '', -1);
    //document.cookie= name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
}



function yourCookie() {
    var cookie = document.cookie.split('; ');
    createList(cookie);
    //listTable.innerHTML += "hello";

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


/*
 * Search for matching
 *
 */
function filterKeyUp() {
    //textField.setAttribute('class', 'form-control city-input');
    var wordPart = document.body.querySelector('#filter-name-input').value;
    console.log("отпустили клавишу, сейчас в поле введено: " + wordPart);

    var cookie = document.cookie.split('; ');
    var cookieNames = [];
    var filteredArray = [];

    //cookie.forEach(function(item, i) {
    //    let splitedItem = item.split('=');
    //    cookieNames[i] = splitedItem[0];
    //});
    //console.log(cookieNames);

    console.log(findPartial( cookie, wordPart));

    //findPartial(cookieNames, wordPart).forEach(function(item, i) {
    //    let cookValue = getCookie(item);
    //    item += '=' + cookValue;
    //    filteredArray.push(item);
    //});

    createList(findPartial(cookie, wordPart));

}


/*
 * Search for matching
 *
 */


function findPartial( arr, ell ) {
    var regex = new RegExp(ell, 'i');
    var resCount = 0;
    var res = [];


    for (let i = 0; i < arr.length; i++) { // Заполняем подсказками
        if (arr[i].match(regex) ) {
            res.push(arr[i]);

            resCount++;
            console.log("Точное совпадение, " + arr[i])
        }
    }
    //resCountWrap.textContent = '(найдено: ' + resCount + ' )';
    if (resCount > 0) console.log('(найдено: ' + resCount + ' )')
    else console.log('совпадений не найдено');

    return res;
}