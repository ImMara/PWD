window.onload = () => {
    init()
}

init = () => {
    const container = document.querySelector('body')

    const select = document.querySelectorAll(".custom-select");
    const allInput = document.querySelector('.custom-select input');

    const deleteOverlay = document.querySelector('.alert')
    const overlayDeleteBtn = deleteOverlay.querySelectorAll('.alert-box .action .btn')
    const message = deleteOverlay.querySelector('.alert-message span')

    const deleteBtn = document.querySelectorAll('.users-page .table table tbody tr td:last-child .btn')

    const triggerEvent = (el, type) => {
        if ("createEvent" in document) {
            var e = document.createEvent("HTMLEvents");
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        } else {
            var e = document.createEventObject();
            e.eventType = type;
            el.fireEvent("on" + e.eventType, e);
        }
    };

    select.forEach(s => {

        let input = s.querySelector('select')

        s.onclick = () => {
            console.log(s)
            s.querySelector(".drop").classList.toggle("d-block");
            s.querySelector(".selected svg").classList.toggle("r-180");
            s.querySelector(".selected svg").classList.toggle("r-180-none");

            s.querySelectorAll(".drop span").forEach(
                (sel) => (sel.onclick = () => {

                    let opt = input.querySelector("option");
                    opt.setAttribute("value", sel.getAttribute("data"));
                    opt.innerHTML = sel.innerText;
                    s.querySelector('.selected').innerHTML = sel.innerText + '<i class="fa-duotone fa-chevron-down r-180-none"></i>';
                    triggerEvent(input, "change");
                })
            );
        };

        input.onchange = (e) => {
            console.log(5, 'change')
            const value = e.target.value
            const userID = s.parentElement.parentElement.getAttribute('id')

            axios.put('/admin/users/' + userID, {role: value})
                .catch(error => console.error(error))
        };

    })

    deleteBtn.forEach(el => {
        el.onclick = ($event) => {
            deleteOverlay.style.display = "block";
            const name = $event.target.parentElement.parentElement.querySelector('td:first-child').innerText
            const eventID = $event.target.parentElement.parentElement.getAttribute('id')

            message.innerHTML = name;

            overlayDeleteBtn[0].onclick = (e) => {
                deleteOverlay.style.display = 'none';
            }
            overlayDeleteBtn[1].onclick = (e) => {
                axios.delete('/admin/users/' + eventID)
                    .then(res => {
                        container.innerHTML = res.data;
                        init();
                    })
                    .catch(error => console.log(error))
            }
        }
    })
}