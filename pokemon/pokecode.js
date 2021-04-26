const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('.fetchPokemonById')
const newButton = document.querySelector('.newPokemon')


loadButton.addEventListener('click', () => {
    loadPage()
})

fetchButton.addEventListener('click', () => {
    let pokeId = prompt("Pokemon ID").toLowerCase()
    console.log(pokeId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then((data) => populatePokeCard(data))
      .catch((error) => console.log(error))
  })

  class Pokemon {
    constructor(name, height, weight, abilities, moves, types, stats) {
      this.id = 900
      this.name = name
      this.height = height
      this.weight = weight
      this.abilities = abilities
      this.moves = moves
      this.types = types
      this.stats = stats
    }
  }


  newButton.addEventListener('click', () => {
 
    let pokeName = prompt('Name your Pokemon')
    let pokeHeight = prompt('Height?')
    let pokeWeight = prompt('Weight?')
    let pokeAbilities = prompt(
      'What are your Pokemon abilities?')
  
    let abilitiesArray = getAbilitiesArray(pokeAbilities)
    let newPokemon = new Pokemon(
      pokeName,
      234,
      3000,
      abilitiesArray,
      ['study', 'code', 'silence'],
      [
        {
          type: {
            name: 'normal',
          },
        },
      ],
      [{
        base_stat: 100,
        stat: {
          name: "hp"
        }
      }]
    )
    populatePokeCard(newPokemon)
  })
  
  function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    return tempArray.map((abilityName) => {
      return {
        ability: {
          name: abilityName,
        },
      }
    })
  }

async function getAPIData(url) {
    try {
            const response = await fetch(url)
            const data = await response.json()
            return data 
    } catch (error) {
        console.log(error)
    }
}

function loadPage(offset, limit) {
    getAPIData(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${100}`,
    ).then(async (data) => {
      for (const singlePokemon of data.results) {
        await getAPIData(singlePokemon.url).then((pokeData) =>
          populatePokeCard(pokeData),
        )
      }
    })
  }

function populatePokeCard(singlePokemon) {

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
}

function populateCardFront(pokemon) {
    //console.log(pokemon)
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card_face card_face-front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)
    pokeFront.appendChild(frontImage)
    pokeFront.appendChild(frontLabel)
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
      let pokeId
        if (pokemon.id < 10) {
            return `images/00${pokemon.id}.png`
        } else if(pokemon.id > 9 && pokemon.id < 100) {
            return `images/0${pokemon.id}.png`
        } else if(pokemon.id > 99 && pokemon.id < 810) {
            return `images/${pokemon.id}.png`
        }
        return `https://github.com/fanzeyi/pokemon.json/blob/master/images/749.png`
    }
