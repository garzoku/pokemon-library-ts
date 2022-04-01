const app = document.querySelector("#app")
const $pokemon = document.querySelector("#pokemon")
const pokemonLibrary = document.querySelector("h1 a")
const spinner = document.createElement("img")




function addPokemon(pokemon) {
    console.log(pokemon)
    const div = document.createElement("div")
    div.innerHTML = `
<div class="pokemon-details">
  <figure>
    <img src=${pokemon.sprites.front_default} alt = ${capitalizeName(pokemon.name)} />
    <figcaption>${capitalizeName(pokemon.name)}</figcaption>
  </figure >

  <h2>Abilities</h2>
  <ul class="abilities">
    <li>
      <span class="ability-name">Ability's name goes here</span>
      <span class="ability-short-description">Ability's short description goes here</span>
    </li>
    <li>
      <span class="ability-name">Ability's name goes here</span>
      <span class="ability-short-description">Ability's short description goes here</span>
    </li>
    <li>
      <span class="ability-name">Ability's name goes here</span>
      <span class="ability-short-description">Ability's short description goes here</span>
    </li>
  </ul>
</div >
    `
    $pokemon.append(div)
}

const url = new URL(window.location)
console.log(url)
const queryString = new URLSearchParams(url.search)
// console.log(queryString)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        addPokemon(parsedResponse)
    })

function capitalizeName(string) {
    return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.Length)
        }`
}