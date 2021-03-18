//const message = 'Hello World'

//console.log(message)

import { films } from '../data/films.js'

/*let itemOne = document.querySelector('#item1')
let itemTwo = document.querySelector('#item2')

itemOne.textContent = films[2].title
itemTwo.textContent = films[1].title*/

console.log(films[0].title)

let movieList = document.querySelector('.movieList')

for (let i = 0; i < films.length; i++) {
    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1))

    let newImage = document.createElement('img')
    newImage.src
    newItem.textContent = foundFilm.title
    titlelist.appendChild(newItem)


    console.log(foundFilm)
}

function getLastNumber(url) {
    let end = url[url.length - 2]
    return parseInt (end, 10)
}
//3/2 start