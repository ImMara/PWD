window.addEventListener("DOMContentLoaded" , () =>{
    init()
})

const init = () => {
    const createBtn = document.querySelector('.events-page .topbar .btn')
    const overlay = document.querySelector('.events-page .overlay')
    const closeOverlay = document.querySelector('.events-page .overlay .close')

    createBtn.onclick = () => {
        tween.play();
        overlay.style.display = "flex"
    }
    closeOverlay.onclick = () => {
        tween.reverse();
        overlay.style.display = "none"
    }

    let tween = gsap.from(".overlay", {
        ease: "power1.in",
        autoAlpha: 0,
        opacity: 0,
        duration: 0.1,
    })
}