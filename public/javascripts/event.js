window.addEventListener('DOMContentLoaded', ()=>{
    init();
})

init = () =>{
    const inputImage = document.querySelector('.event-page form input[type="file"]')
    const image = document.querySelector('.event-page form .img-container')

    image.onclick = (e) =>{
        inputImage.click();
    }
}