/**
 * Created by Danil on 27.02.2018.
 */

console.log("NODE JS are working. Тест русских символов");

var newWin;

document.body.querySelector('.openNew').addEventListener('click', function () {
    createWindow('test', 600, 400);
})

document.body.querySelector('.closeNew').addEventListener('click', function () {
    console.log('click');
    closeWindow(newWin);
})


function createWindow(name, width, height) {
    var params = 'height='+height+',width='+width;
    newWin = window.open('test.html', name, params)
    newWin.focus();
}

function closeWindow(window) {
    window.close();
}