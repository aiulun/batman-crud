const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    fetch('/actors', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Ben Affleck',
            movie: 'Batman V Superman',
            year: 2017,
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    }) 
})

deleteButton.addEventListener('click', _ => {
    fetch('/actors', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Ben Affleck',
        }),
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No movie to delete') {
            messageDiv.textContent = 'No Ben Affleck movie to delete'
        } else {
            window.location.reload(true);
        }
    })
})