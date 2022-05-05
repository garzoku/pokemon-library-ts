let $main: HTMLInputElement | null
let $pokemon: HTMLDivElement | null
let $spinner: HTMLImageElement

document.addEventListener('DOMContentLoaded', (event) => {
    displayLoadingIcon()
})

if (typeof window !== undefined) {
    $main = document.querySelector<HTMLInputElement>('main')
    $pokemon = document.querySelector<HTMLDivElement>('#pokemon')
    $spinner = document.createElement('img')
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


function addPokemon(pokemon: string, pokemonImage: string) {
    const div = document.createElement('div')
    div.innerHTML = `
<div class="pokemon-details">
  <figure>
    <img src=${pokemonImage} alt = ${capitalizeName(pokemon)} />
    <figcaption>${capitalizeName(pokemon)}</figcaption>
  </figure >

  <h2>Abilities</h2>
  <ul class="abilities">
    <li>
      <span class="ability-name"></span>
      <span class="ability-short-description"></span>
    </li>
    <li>
      <span class="ability-name"></span>
      <span class="ability-short-description"></span>
    </li>
    <li>
      <span class="ability-name"></span>
      <span class="ability-short-description"></span>
    </li>
  </ul>
</div >
    `
    $pokemon?.append(div)
}

//const url: URL = new URL(window.location.search)
//console.log(url)
//const queryString: URLSearchParams = new URLSearchParams(url.search)
//console.log(queryString.get('pokemon'))
if (typeof window !== undefined) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${localStorage.getItem("pokemon")}`)
        .then(response => response.json())
        .then((parsedResponse: PokemonData) => {
            const pokemon = parsedResponse
            addPokemon(pokemon.name, pokemon.sprites.front_default)
            //const abilityNames = pokemon.abilities
            //    .map(element => element.ability.name)
            //setAbilityNames(abilityNames)
            // const requests = pokemon.abilities
            //    .map(element => element.ability)
            //    .map(object => {
            //        return window.fetch(object.url)
            //           .then(response => response.json())
            //   })
            // return Promise.all(requests)
        })//.then(response => {
    //  const savedResponse = response
    //  const descriptions = []
    //  for (const object of savedResponse) {
    //     for (const array of object.effect_entries) {
    //         if (array.language.name === 'en') { descriptions.push(array.short_effect) }
    //     }
    // }
    //setAbilityDescription(descriptions)
    //  $spinner.classList.add('hidden')
    // })   
}
/*
function setAbilityNames(names) {
    const $abilityNames = document.querySelectorAll('.ability-name')
    for (let i = 0; i < names.length; i++) {
        $abilityNames[i].textContent = capitalizeName(names[i])
    }
}

function setAbilityDescription(abilitiesArray) {
    const $lis = document.querySelectorAll('li')
    const $abilityDescrip = document.querySelectorAll('.ability-short-description')
    for (let i = 0; i < abilitiesArray.length; i++) {
        $abilityDescrip[i].textContent = capitalizeName(abilitiesArray[i])
        if (abilitiesArray.length < $abilityDescrip.length) {
            const difference = $abilityDescrip.length - abilitiesArray.length // 2
            let index = $abilityDescrip.length - 1
            for (let j = 0; j < difference; j++) {
                $lis[index].remove()
                index--
            }
        }
    }
}
*/
function displayLoadingIcon() {
    $spinner.classList.add('spinner')
    $spinner.src = 'images/loading-icon.gif'
    $main?.append($spinner)
}

function capitalizeName(name: string) {
    return `${name.slice(0, 1).toUpperCase()}${name.slice(1, name.length)
        }`
}