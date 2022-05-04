let $main: HTMLInputElement | null
let $ul: HTMLUListElement | null
let $spinner: HTMLImageElement

if (typeof window !== 'undefined') {
    $main = document.querySelector<HTMLInputElement>("main")
    $ul = document.querySelector<HTMLUListElement>("ul")
    $spinner = document.createElement('img')
} else {
    console.log('You are on the server')
}


document.addEventListener('DOMContentLoaded', (event) => {
    displayLoadingIcon()
})

type PokemonData = {
    name: string;
    imageURL: string;
}

function addPokemon(pokemon: PokemonData) {
    const $li = document.createElement('li')
    const $div = document.createElement('div')
    $div.classList.add('pokemon-listing')
    $div.innerHTML = `
    <figure>
      <img class="pokeball" src="images/pokeball.png" alt="small pokeball" />
      <img class="card-image" src="" alt="${capitalizeName(pokemon.name)}" />
      <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${capitalizeName(pokemon.name)}</a></figcaption>
    </figure>
  `
    if ($ul && $li) {
        $ul.append($li)
        $li.append($div)
        $spinner.classList.add('hidden')
    }
}
/*
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
            addPokemon(response)
        })
    })

    */

function displayLoadingIcon() {
    $spinner.classList.add('spinner')
    $spinner.src = './images/loading-icon.gif'
    console.log($spinner)
    if ($main) {
        // console.log($main)
        $main.append($spinner)
    }
}

function capitalizeName(name: string) {
    return `${name.slice(0, 1).toUpperCase()}${name.slice(1, name.length)
        }`
}
