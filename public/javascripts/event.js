window.addEventListener('DOMContentLoaded', ()=>{
    init();
})

init = () =>{
    const inputImage = document.querySelector('.event-page form input[type="file"]')
    const image = document.querySelector('.event-page form img')

    image.onclick = (e) =>{
        inputImage.click();
    }
}