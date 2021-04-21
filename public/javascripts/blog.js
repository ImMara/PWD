window.addEventListener('DOMContentLoaded',()=>{
    bind()
})

const bind = () => {
    const createBtn = document.querySelector('.topbar .flex .btn')
    const overlay = document.querySelector('.blog .overlay')
    const closeOverlay = document.querySelector('.blog .overlay .close')
    const deleteBtn = document.querySelectorAll('.card div .btn:nth-child(2)')
    const editBtn = document.querySelectorAll('.card div .btn:first-child')
    const container = document.querySelector('body')

    createBtn.onclick = () => {
        tween.play();
        overlay.style.display = "flex"
    }

    deleteBtn.forEach(el => {
        el.onclick = ($event) => {
            const blogID = $event.target.parentElement.parentElement.getAttribute('id')
            axios.delete('/admin/blogs/' + blogID)
                .then(res => {
                    container.innerHTML = res.data;
                    bind();
                })
                .catch(error => console.log(error));
        }
    })

    editBtn.forEach(el =>{
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