const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('.fetchPokemonById')
const newButton = document.querySelector('.newPokemon')


loadButton.addEventListener('click', () => {
    loadPage()
})

fetchButton.addEventListener('click', () => {
    let pokeId = prompt("Pokemon Name:").toLocaleLowerCase()
    console.log(pokeId);
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(
        data => populatePokecard(data)
    ).catch(error => console.log(error))
})

class Pokemon {
    constructor(name, height, weight, abilities, moves) {
        this.name = name
        this.height = height
        this.weight = weight
        this.abilities = abilities
        this.moves = moves
    }
}


newButton.addEventListener('click', () => {
    let pokeName = prompt("Name your Pokemon!")
    let pokeHeight = prompt("How tall are they?")
    let pokeWeight = prompt("How much do they weigh?")
    let pokeAbilities = prompt("Top abilities?")
    let pokeMoves = prompt("Moves?")
    let newPokemon = new Pokemon(pokeName, pokeHeight, pokeWeight, pokeAbilities, pokeMoves)
    populatePokecard(newPokemon)
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
    getAPIData(`https://pokeapi.co/api/v2/pokemon/?limit=100`).then(
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
    /*let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name*/
    let frontImage = document.createElement('img')
    frontImage.src = `images/${getImageFileName(pokemon)}.png`
    pokeFront.appendChild(frontImage)
  //pokeFront.appendChild(frontLabel)
    
    return pokeFront
}


function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card_face card_face-back'

    let backLabel = document.createElement('p') 
        backLabel.textContent = pokemon.name /*`Moves: ${pokemon.moves.length}`*/
        pokeBack.appendChild(backLabel)

        pokemon.types.forEach((pokeType) => {
            let backType = document.createElement('p')
            backType.textContent = pokeType.type.name;
            pokeBack.appendChild(backType)
            pokeBack.classList.add(pokemon.types[0].type.name)
            
        })

        return pokeBack
    }

    function getImageFileName(pokemon) {
        if (pokemon.id < 10) {
            return `00${pokemon.id}`
        } else if(pokemon.id > 9 && pokemon.id < 100) {
            return `0${pokemon.id}`
        } else if(pokemon.id > 99 && pokemon.id < 810) {
            return `${pokemon.id}`
        }
    }
