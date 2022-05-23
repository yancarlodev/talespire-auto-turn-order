let diceInput = document.querySelector('.dice-input')
let modInput = document.querySelector('.mod-input')
const rollButton = document.querySelector('.roll-button')
const rollLink = document.querySelector('.roll-link')
const rollList = document.querySelector('.roll-list')
const cleanButton = document.querySelector('#clean-list')
const emptyText = document.querySelector('.empty-text')

data.sort((a, b) => {
    return b.total - a.total
})

function renderRollList () {
    if(data.length > 0) {
    rollList.innerHTML = ''
    rollList.classList.remove('empty')

    data.forEach(element => {
        rollList.insertAdjacentHTML('beforeend', `
            <li class="roll-card">
                <h3 class="char-name">${element.player}</h3>
                <h3 class="roll-result">Rolled ${element.total}</h3>
            </li>
        `)
    });
    }
}

renderRollList()

function rollDiceInGame () {
    let diceValue = diceInput.value
    let modValue = modInput.value

    if(diceValue === '') {
        alert('Insert a dice value first')
    } else {
        rollLink.href = `talespire://dice/Initiative:${diceValue + modValue}`
        rollButton.onclick = location.href = `talespire://dice/Initiative:${diceValue + modValue}`
    }
}

rollButton.addEventListener('click', rollDiceInGame)

function cleanList () {
    rollList.innerHTML = ''
    rollList.classList.add('empty')
    rollList.insertAdjacentHTML('beforeend', `
        <h2 class="empty-text">The queue is empty...</h2>
    `)
}

cleanButton.addEventListener('click', cleanList)