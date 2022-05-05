"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
let $main;
let $ul;
let $spinner;
if (typeof window !== 'undefined') {
    $main = document.querySelector("main");
    $ul = document.querySelector("ul");
    $spinner = document.createElement('img');
} else console.log('You are on the server');
document.addEventListener('DOMContentLoaded', (event)=>{
    displayLoadingIcon();
    if (typeof window !== 'undefined') fetch('https://pokeapi.co/api/v2/pokemon?limit=50').then((response)=>response.json()
    ).then((response1)=>{
        const pokemonList = response1.results;
        const requests = pokemonList === null || pokemonList === void 0 ? void 0 : pokemonList.map((obj)=>{
            // addPokemon(obj.name)
            return fetch(obj.url).then((response)=>response.json()
            );
        });
        requests === null || requests === void 0 || requests.forEach((request)=>{
            return Promise.all(requests).then((responses)=>{
                responses.forEach((response)=>{
                    addPokemon(response.name, response.sprites.front_default);
                });
            });
        });
    });
});
function addPokemon(pokemon, pokemonImage) {
    const $li = document.createElement('li');
    const $div = document.createElement('div');
    $div.classList.add('pokemon-listing');
    $div.innerHTML = `
    <figure>
      <img class="pokeball" src="" alt="small pokeball" />
      <img class="card-image" src="${pokemonImage}" alt="${capitalizeName(pokemon)}" />
      <figcaption><a href="pokemon.html?pokemon=${pokemon}">${capitalizeName(pokemon)}</a></figcaption>
    </figure>
  `;
    if ($ul && $li) {
        $ul.append($li);
        $li.append($div);
        $spinner.classList.add('hidden');
    }
}
function getPokemonUrl(pokemon) {
    return pokemon.url;
}
function displayLoadingIcon() {
    $spinner.classList.add('spinner');
    $spinner.src = '../images/loading-icon.gif';
    if ($main) $main.append($spinner);
}
function capitalizeName(word) {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1, word.length)}`;
}

//# sourceMappingURL=index.f925a820.js.map
