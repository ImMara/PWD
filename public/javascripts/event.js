window.addEventListener('DOMContentLoaded', () => {
    init();
})

init = () => {
    const inputImage = document.querySelector('.event-page form input[type="file"]')
    const image = document.querySelector('.event-page form .img-container')
    const date = document.querySelector('.date')
    const endDate = document.querySelector('.endDate')

    date.addEventListener('change',(e)=>{
        const value = e.target.value
        endDate.setAttribute('min',value)
    })

    image.onclick = (e) => {
        inputImage.click();
    }
}