const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')


loadButton.addEventListener('click', () => {
    loadPage()
})

async function getAPIData(url) {
    try {
            const response = await fetch(url)
            const data = await response.json()
            return data 
    } catch (error) {
        console.log(error)
    }
}

function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/?limit=25`).then(
        (data) => {
            for (const singlePokemon of data.results) {
            populatePokecard(singlePokemon)
        }
    }
    )
}

function populatePokecard(singlePokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    
    pokeCard.appendChild(populateCardFront(singlePokemon))

    pokeCard.appendChild(populateCardBack(singlePokemon))

    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
    console.log(singlePokemon)
}

function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card_face card_face-front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = `images/001.png`
    pokeFront.appendChild(frontImage)
    pokeFront.appendChild(frontLabel)
    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card_face card_face-back'
    let backLabel = document.createElement('p') 
        backLabel.textContent = `Back of card`
        pokeBack.appendChild(backLabel)
        return pokeBack
    }
