const main = document.querySelector('main')
const $pokemon = document.querySelector('#pokemon')
const spinner = document.createElement('img')

document.addEventListener('DOMContentLoaded', (event) => {
  displayLoadingIcon()
})

function addPokemon(pokemon) {
  const div = document.createElement('div')
  div.innerHTML = `
<div class="pokemon-details">
  <figure>
    <img src=${pokemon.sprites.front_default} alt = ${capitalizeName(pokemon.name)} />
    <figcaption>${capitalizeName(pokemon.name)}</figcaption>
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
  $pokemon.append(div)
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
window.fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get('pokemon')}`)
  .then(response => response.json())
  .then(parsedResponse => {
    const pokemon = parsedResponse
    addPokemon(pokemon)
    const abilityNames = pokemon.abilities
      .map(ability => ability)
      .map(element => element.ability)
      .map(object => object.name)
    setAbilityNames(abilityNames)
    const requests = pokemon.abilities
      .map(ability => ability)
      .map(element => element.ability)
      .map(object => {
        return window.fetch(object.url)
          .then(response => response.json())
      })
    return Promise.all(requests)
  }).then(response => {
    const savedResponse = response
    const descriptions = []
    for (const object of savedResponse) {
      for (const array of object.effect_entries) {
        if (array.language.name === 'en') { descriptions.push(array.short_effect) }
      }
    }
    setAbilityDescription(descriptions)
    spinner.classList.add('hidden')
  })

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

function displayLoadingIcon() {
  spinner.classList.add('spinner')
  spinner.src = 'images/loading-icon.gif'
  main.append(spinner)
}

function capitalizeName(string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.Length)
    }`
}
