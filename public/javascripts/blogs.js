window.addEventListener('DOMContentLoaded', () => {
    init()
})

const init = () => {

    const createBtn = document.querySelector('.topbar .flex .btn')

    const overlay = document.querySelector('.blog .overlay')

    const closeOverlay = document.querySelector('.blog .overlay .close')
    const deleteBtn = document.querySelectorAll('.card div .btn:nth-child(2)')

    const deleteOverlay = document.querySelector('.alert')
    const overlayDeleteBtn = deleteOverlay.querySelectorAll('.alert-box .action .btn')
    const message = deleteOverlay.querySelector('.alert-message span')

    const editBtn = document.querySelectorAll('.card div .btn:first-child')
    const container = document.querySelector('body')

    createBtn.onclick = () => {
        tween.play();
        overlay.style.display = "flex"
    }

    deleteBtn.forEach(el => {
        el.onclick = ($event) => {
            deleteOverlay.style.display = "block";
            const blogID = $event.target.parentElement.parentElement.getAttribute('id')
            const name = $event.target.parentElement.parentElement.querySelector('h2').innerText

            message.innerHTML = name;

            overlayDeleteBtn[0].onclick = (e) => {
                deleteOverlay.style.display = 'none';
            }
            overlayDeleteBtn[1].onclick = (e) => {
                axios.delete('/admin/blogs/' + blogID)
                    .then(res => {
                        container.innerHTML = res.data;
                        init();
                    })
                    .catch(error => console.log(error));
            }
        }
    })

    editBtn.forEach(el => {
        el.onclick = ($event) => {
            const blogID = $event.target.parentElement.parentElement.getAttribute('id')
            window.location.replace(`/admin/blogs/${blogID}`)
        }
    })

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