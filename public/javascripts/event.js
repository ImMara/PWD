window.addEventListener('DOMContentLoaded', ()=>{
    init();
})

const init = () =>{
    const inputImage = document.querySelector('.event-page form input[type="file"]')
    const image = document.querySelector('.event-page form img')

    image.onclick = (e) =>{
        inputImage.click();
    }
}