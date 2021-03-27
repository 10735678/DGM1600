export function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    let start = end - 2
    if (url.charAt(start) === '/') {
        start++
    }
    return +url.slice(start, end)
}

export function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

// while (element.firstChild) {
    // element.removeChild(element.firstChild);
// }