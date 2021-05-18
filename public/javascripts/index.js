
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');


burger.onclick = (e) =>{
    menu.classList.toggle('open');
}