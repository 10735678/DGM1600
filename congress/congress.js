import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const birthdayButton = document.querySelector('#birthdayButton')
const republicansButton = document.querySelector('#republicans')
const democratsButton = document.querySelector('#democrats')


republicansButton.addEventListener('click', () => {
    populateCongressDiv(filterCongressPeople(representatives, 'R'))
})

democratsButton.addEventListener('click', () => {
    populateCongressDiv(filterCongressPeople(representatives, 'D'))
})


seniorityButton.addEventListener('click', () => senioritySort())
birthdayButton.addEventListener('click', () => birthdaySort())

function populateCongressDiv(simplifiedList) {
    removeChildren(congressGrid)
    simplifiedList.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')
        if (person.party === 'R') partyIcon.className = 'fas fa-republican'
        if (person.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (person.party === 'ID') partyIcon.className = 'fas fa-mitten'

        figImg.src = person.imgURL
        figCaption.textContent = person.name
        figCaption.appendChild(partyIcon)
        personFig.appendChild(figImg)
        personFig.appendChild(figCaption)
        personDiv.appendChild(personFig)
        congressGrid.appendChild(personDiv)
    })
}

function getSimplifiedPeople(peopleList) {
    return peopleList.map(person => {
        let middleName = person.middle_name ? ` ${person.middle_name}` : ``
        return {
            id: person.id,
            name: `${person.first_name}${middleName} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-100px.jpeg`,
            seniority: parseInt(person.seniority, 10),
            party: person.party,
            
        }
    })
}


function senioritySort() {
    populateCongressDiv(getSimplifiedPeople(senators).sort((a, b) => a.seniority - b.seniority).reverse())
}

function birthdaySort() {
    populateCongressDiv(getSimplifiedPeople(senators).sort((a, b) => a.birthday - b.birthday))
}


const filterCongressPeople = (chamber, politicalParty) => {
    return getSimplifiedPeople(chamber).filter(member => member.party === politicalParty)
}


populateCongressDiv(getSimplifiedPeople(senators))

