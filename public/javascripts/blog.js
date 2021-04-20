let add = document.querySelector('.topbar .flex .btn')
const overlay = document.querySelector('.blog .overlay')
const closeOverlay = document.querySelector('.blog .overlay .close')

add.onclick = () => {
    tween.play();
    overlay.style.display = "flex"
}

closeOverlay.onclick = () => {
    tween.reverse();
    overlay.style.display = "none"
}

let tween = gsap.from(".overlay",{
    ease:"power1.in",
    autoAlpha:0,
    opacity:0,
    duration:0.1,
})