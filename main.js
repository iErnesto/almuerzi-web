const stringToHTML = (s) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(s, 'text/html')

    return doc.body.firstChild

}

const renderItem = (item) => {
    const element = stringToHTML(`<li data-id="${item._id}">${item.name}</li>`)

    element.addEventListener('click', () => {
        const mealsList = document.getElementById('meals-list')
        Array.from(mealsList.children)
            .forEach(x => x.classList.remove('selected'))
        element.classList.add('selected')

        //nos permite tener el id del elemento seleccionado de la lista de meals
        const mealsIdInput = document.getElementById('meals-id')
        mealsIdInput.value = item._id
    })

    return element
}

window.onload = () => {
    fetch('http://localhost:3000/api/meals',)
        .then(response => response.json())
        .then(data => {

            const mealslist = document.getElementById('meals-list')
            const submit = document.getElementById('submit')
            const listItems = data.map(renderItem)
            mealslist.removeChild(mealslist.firstElementChild)
            listItems.forEach(element => mealslist.appendChild(element))
            submit.removeAttribute('disabled')

        })
}