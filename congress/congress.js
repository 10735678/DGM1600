import { senators } from '../data/senators.js'
import { representatives } from '../Data/representatives.js'

//console.log(senators.length, representatives.length)

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const birthdayButton = document.querySelector('#birthdayButton')

function populateCongressDiv(somearray) {
    somearray.forEach(person => {
        let personDiv = document.createElement('div')
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figCaption.textContent = person.name
    })
}

function getSimplifiedPeople(peopleList) {
    return peopleList.map(person => {
        return {
            id: person.id,
            name: person.first_name
        }
    })
}

populateCongressDiv(getSimplifiedPeople(representatives))
