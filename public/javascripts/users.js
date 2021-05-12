window.onload = () =>{
    init()
}

init = () =>{

    const select = document.querySelector(".selected");
    const input = document.querySelector(".custom-select select");

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

    select.onclick = () => {
        document.querySelector(".custom-select .drop").classList.toggle("d-block");
        select.querySelector("svg").classList.toggle("r-180");
        select.querySelector("svg").classList.toggle("r-180-none");
    };

    document.querySelectorAll(".custom-select .drop span").forEach(
        (s) =>
            (s.onclick = () => {
                let opt = input.querySelector("option");
                opt.setAttribute("value", s.getAttribute("data"));
                opt.innerHTML = s.innerText;
                document
                    .querySelector(".custom-select .drop")
                    .classList.toggle("d-block");
                select.innerHTML =
                    s.innerText + '<i class="fa-duotone fa-chevron-down r-180-none"></i>';

                triggerEvent(input, "change");
            })
    );


    input.onchange = () => {
            const value = input.value
            const userID = select.parentElement.parentElement.parentElement.getAttribute('id')

            axios.patch('/admin/users/'+ userID , { role : value })
                .catch(error => console.error(error))
    };
}