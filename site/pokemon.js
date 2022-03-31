const app = document.querySelector("#app")
const $pokemon = document.querySelector(".pokemon")
const pokemonLibrary = document.querySelector("h1 a")
const spinner = document.createElement("img")




function addPokemonImage(pokemon) {
    console.log(pokemon)
    const div = document.createElement("div")
    div.innerHTML = `
    <a href="pokemon.html?pokemon=${pokemon.name}" >
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    </a>
    `
    $pokemon.append(div)
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        addPokemonImage(parsedResponse)
    })

function buildListing(pokemon) {
}

function fillListing(pokemon) {

}
function capitalizeName(string) {
    return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.Length)
        }`
}