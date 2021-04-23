window.addEventListener('DOMContentLoaded', ()=>{
    init();
})

init = () =>{
    const inputImage = document.querySelector('.blog-page form input[type="file"]')
    const image = document.querySelector('.blog-page form img')

    image.onclick = (e) =>{
        inputImage.click();
    }
}