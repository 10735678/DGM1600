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
    getAPIData(`https://pokeapi.co/api/v2/pokemon/?limit=809`).then(
   async (data) => {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => populatePokecard(pokeData)
                )
            
        }
    }
    )
}

function populatePokecard(singlePokemon) {
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    
    pokeCard.appendChild(populateCardFront(singlePokemon))

    pokeCard.appendChild(populateCardBack(singlePokemon))

    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
    console.log(singlePokemon)
}

function populateCardFront(pokemon) {
    console.log(pokemon)
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card_face card_face-front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = `images/${getImageFileName(pokemon)}.png`
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

    function getImageFileName(pokemon) {
        if (pokemon.id < 10) {
            return `00${pokemon.id}`
        } else if(pokemon.id > 9 && pokemon.id < 100) {
            return `0${pokemon.id}`
        } else if(pokemon.id > 99 && pokemon.id < 1000) {
            return `${pokemon.id}`
        }
    }
