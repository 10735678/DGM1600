import { starships } from '../Data/starships.js'
import { getLastNumber } from '../utils/index.js'

const main = document.querySelector('main')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.shipView')

function populateNav() {
    starships.forEach((starship) => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        anchorWrap.addEventListener('click', () => {
            console.log(`You just clicked on ${starship.name}`)
            populateShipView(starship)
        })
        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    })
}

function populateShipView(shipData) {
    let shipImage = document.createElement('img')
    let shipNum = getLastNumber(shipData.url)
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
    shipView.appendChild(shipImage)
}

populateNav()
populateShipView()