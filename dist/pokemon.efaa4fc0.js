"use strict";
let $main;
let $pokemon;
let $spinner;
document.addEventListener('DOMContentLoaded', (event)=>{
    displayLoadingIcon();
});
$main = document.querySelector('main');
$pokemon = document.querySelector('#pokemon');
$spinner = document.createElement('img');
function addPokemon(pokemon, pokemonImage) {
    const div = document.createElement('div');
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
    `;
    $pokemon === null || $pokemon === void 0 || $pokemon.append(div);
}
fetch(`https://pokeapi.co/api/v2/pokemon/${localStorage.getItem("pokemon")}`).then((response)=>response.json()
).then((parsedResponse)=>{
    const pokemon = parsedResponse;
    addPokemon(pokemon.name, pokemon.sprites.front_default);
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
}); //.then(response => {
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
*/ function displayLoadingIcon() {
    $spinner.classList.add('spinner');
    $spinner.src = 'images/loading-icon.gif';
    $main === null || $main === void 0 || $main.append($spinner);
}
function capitalizeName(name) {
    return `${name.slice(0, 1).toUpperCase()}${name.slice(1, name.length)}`;
}

//# sourceMappingURL=pokemon.efaa4fc0.js.map
