"use strict";
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
});
function addPokemon(pokemon) {
    const $li = document.createElement('li');
    const $div = document.createElement('div');
    $div.classList.add('pokemon-listing');
    $div.innerHTML = `
    <figure>
      <img class="pokeball" src="images/pokeball.png" alt="small pokeball" />
      <img class="card-image" src="" alt="${capitalizeName(pokemon.name)}" />
      <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${capitalizeName(pokemon.name)}</a></figcaption>
    </figure>
  `;
    if ($ul && $li) {
        $ul.append($li);
        $li.append($div);
        $spinner.classList.add('hidden');
    }
}
if (typeof window !== 'undefined') fetch('https://pokeapi.co/api/v2/pokemon?limit=50').then((response)=>response.json()
).then((response)=>{
    const pokemonList = response;
    console.log(pokemonList);
});
else console.log('You are on the server');
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

    */ function displayLoadingIcon() {
    $spinner.classList.add('spinner');
    $spinner.src = './images/loading-icon.gif';
    if ($main) // console.log($main)
    $main.append($spinner);
}
function capitalizeName(word) {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1, word.length)}`;
}

//# sourceMappingURL=index.f925a820.js.map
