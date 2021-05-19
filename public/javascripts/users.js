window.onload = () => {
    init()
}

init = () => {

    const select = document.querySelectorAll(".custom-select");
    const allInput = document.querySelector('.custom-select input');

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

            axios.patch('/admin/users/' + userID, {role: value})
                .catch(error => console.error(error))
        };

    })
}