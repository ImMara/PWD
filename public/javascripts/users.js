window.onload = () =>{
    init()
}

init = () =>{

    const select = document.querySelector('.users-page .table tr td select')
    select.onchange = () => {

        const value = select.value
        const userID = select.parentElement.parentElement.getAttribute('id')
        const container = document.querySelector('body')

        axios.patch('/admin/users/'+ userID , { role : value })
            .catch(error => console.error(error))
    }

}