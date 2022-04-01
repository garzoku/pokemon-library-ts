const main = document.querySelector('main')
const $ul = document.querySelector('.pokemon')
const spinner = document.createElement('img')

document.addEventListener('DOMContentLoaded', (event) => {
  displayLoadingIcon()
})

window.fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
  .then((response) => response.json())
  .then((response) => {
    const pokemonList = response.results
    const requests = pokemonList
      .map((pokemon) => pokemon.url)
      .map(url => {
        return window.fetch(url)
          .then(response => response.json())
      })
    return Promise.all(requests)
  }).then(responses => {
    responses.forEach(response => {
      buildListing(response)
    })
  })

function displayLoadingIcon () {
  spinner.classList.add('spinner')
  spinner.src = 'images/loading-icon.gif'
  main.append(spinner)
}

function buildListing (pokemon) {
  const $li = document.createElement('li')
  const listingDiv = document.createElement('div')
  listingDiv.className = 'pokemon-listing'
  const listingFig = document.createElement('figure')
  const listingImage = document.createElement('img')
  listingImage.classList.add('card-image')
  const listingFigCaption = document.createElement('figcaption')
  const pokeball = document.createElement('img')
  pokeball.src = 'images/pokeball.png'
  pokeball.classList.add('pokeball')
  const listingA = document.createElement('a')

  $ul.append($li)
  $li.append(listingDiv)
  listingDiv.append(listingFig)
  listingFig.append(pokeball)
  listingFig.append(listingImage)
  listingFig.append(listingFigCaption)
  listingFigCaption.append(listingA)
  fillListing(pokemon)

  function fillListing (pokemon) {
    listingA.href = `pokemon.html?pokemon=${pokemon.name}`
    listingA.textContent = capitalizeName(pokemon.name)
    listingImage.src = pokemon.sprites.front_default
    listingImage.alt = capitalizeName(pokemon.name)
  }
  spinner.classList.add('hidden')
}

function capitalizeName (string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.Length)
    }`
}
