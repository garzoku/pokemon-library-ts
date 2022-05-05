let $main: HTMLInputElement | null
let $ul: HTMLUListElement | null
let $spinner: HTMLImageElement

/// <reference path="node.d.ts"/>
import pokeballIcon from '../images/pokeball.png'

if (typeof window !== 'undefined') {
    $main = document.querySelector<HTMLInputElement>("main")
    $ul = document.querySelector<HTMLUListElement>("ul")
    $spinner = document.createElement('img')
} else {
    console.log('You are on the server')
}


document.addEventListener('DOMContentLoaded', (event) => {
    displayLoadingIcon()
    if (typeof window !== 'undefined') {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
            .then((response) => response.json())
            .then((response: PokemonResponse) => {
                const pokemonList = response.results

                const requests = pokemonList?.map(obj => {
                    // addPokemon(obj.name)
                    return fetch(obj.url)
                        .then(response => response.json())
                })
                requests?.forEach((request) => {
                    return Promise.all<PokemonData>(requests)
                        .then(responses => {
                            responses.forEach(response => {
                                addPokemon(response.name, response.sprites.front_default)
                            })
                        })

                })

            })
    }
})


function addPokemon(pokemon: string, pokemonImage: string) {
    const $li = document.createElement('li')
    const $div = document.createElement('div')
    $div.classList.add('pokemon-listing')
    $div.innerHTML = `
    <figure>
      <img class="pokeball" src="${pokeballIcon}" alt="small pokeball" />
      <img class="card-image" src="${pokemonImage}" alt="${capitalizeName(pokemon)}" />
      <figcaption><a href="pokemon.html?pokemon=${pokemon}">${capitalizeName(pokemon)}</a></figcaption>
    </figure>
  `
    if ($ul && $li) {
        $ul.append($li)
        $li.append($div)
        $spinner.classList.add('hidden')
    }
}

type PokemonData = {
    name: string;
    sprites: {
        front_default: string
    }
}

type PokemonResponse = {
    results?: {
        name: string;
        url: string;
    }[]

    errors?: { message: string }[]
}

function getPokemonUrl(pokemon: { name: string; url: string }) {
    return pokemon.url;
}

function displayLoadingIcon() {
    $spinner.classList.add('spinner')
    $spinner.src = '../images/loading-icon.gif'
    if ($main) {
        $main.append($spinner)
    }
}

function capitalizeName(word: string) {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1, word.length)
        }`
}
