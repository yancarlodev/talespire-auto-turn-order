let diceInput = document.querySelector('.dice-input')
let modInput = document.querySelector('.mod-input')
const rollButton = document.querySelector('.roll-button')
const rollLink = document.querySelector('.roll-link')
const rollList = document.querySelector('.roll-list')
const cleanButton = document.querySelector('#clean-list')
const emptyText = document.querySelector('.empty-text')
const creditsModal = document.querySelector('.credits-modal')
const closeButton = document.querySelector('.close-icon')
const creditsButton = document.querySelector('.credits')

const axiosClient = axios.create({
    baseURL: 'https://talespire-initiative.herokuapp.com'
})

const getInitiativeRolls = async () => {
    try {
      const response = await axiosClient.get(`/initiative`);
  
      const rolls = response.data;
  
      console.log(`GET: Here's the list of todos`, rolls);
  
      return rolls;
    } catch (errors) {
      console.error(errors);
    }
};

async function renderRollList () {
    const rolledData = await getInitiativeRolls()
    console.log(rolledData)
    if(rolledData.length > 0) {
    rollList.innerHTML = ''
    rollList.classList.remove('empty')

    rolledData.forEach(element => {
        rollList.insertAdjacentHTML('beforeend', `
            <li class="roll-card">
                <h3 class="char-name">${element.mini}</h3>
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

async function cleanList () {
    rollList.innerHTML = ''
    rollList.classList.add('empty')
    rollList.insertAdjacentHTML('beforeend', `
        <h2 class="empty-text">The queue is empty...</h2>
    `)
    await axiosClient.delete('/initiative')
}

cleanButton.addEventListener('click', cleanList)

closeButton.addEventListener('click', () => {
    creditsModal.classList.remove('visible')
})

creditsButton.addEventListener('click', () => {
    creditsModal.classList.add('visible')
})