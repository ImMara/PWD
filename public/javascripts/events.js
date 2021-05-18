window.addEventListener("DOMContentLoaded" , () =>{
    init()
})

const init = () => {
    const createBtn = document.querySelector('.events-page .topbar .btn')
    const overlay = document.querySelector('.events-page .overlay')
    const closeOverlay = document.querySelector('.events-page .overlay .close')

    const deleteOverlay = document.querySelector('.alert')
    const overlayDeleteBtn = deleteOverlay.querySelectorAll('.alert-box .action .btn')
    const message = deleteOverlay.querySelector('.alert-message span')

    const deleteBtn = document.querySelectorAll('.events-container .action .btn:nth-child(2)')
    const container = document.querySelector('body')

    const editBtn = document.querySelectorAll('.events-container .action .btn:first-child');

    createBtn.onclick = () => {
        tween.play();
        overlay.style.display = "flex"
    }
    closeOverlay.onclick = () => {
        tween.reverse();
        overlay.style.display = "none"
    }

    deleteBtn.forEach( el => {
        el.onclick = ($event) =>{
            deleteOverlay.style.display= "block";
            const name = $event.target.parentElement.parentElement.querySelector('h2').innerText
            const eventID = $event.target.parentElement.parentElement.getAttribute('id')

            message.innerHTML=name;

            overlayDeleteBtn[0].onclick = (e) =>{
                deleteOverlay.style.display='none';
            }
            overlayDeleteBtn[1].onclick = (e) =>{
                axios.delete('/admin/events/'+eventID)
                    .then(res => {
                        container.innerHTML= res.data;
                        init();
                    })
                    .catch(error => console.log(error))
            }
        }
    })

    editBtn.forEach(el =>{
        el.onclick = ($event) =>{
            const eventID = $event.target.parentElement.parentElement.getAttribute("id");
            window.location.replace(`/admin/events/${eventID}`);
        }
    })

    let tween = gsap.from(".overlay", {
        ease: "power1.in",
        autoAlpha: 0,
        opacity: 0,
        duration: 0.1,
    })
}