"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let $main;
let $ul;
let $spinner;
/// <reference path="node.d.ts"/>
const pokeball_png_1 = __importDefault(require("../images/pokeball.png"));
/// <reference path="node.d.ts"/>
const pokemon_html_1 = __importDefault(require("../pokemon.html"));
if (typeof window !== 'undefined') {
    $main = document.querySelector("main");
    $ul = document.querySelector("ul");
    $spinner = document.createElement('img');
}
else {
    console.log('You are on the server');
}
document.addEventListener('DOMContentLoaded', (event) => {
    displayLoadingIcon();
    if (typeof window !== 'undefined') {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
            .then((response) => response.json())
            .then((response) => {
            const pokemonList = response.results;
            const requests = pokemonList === null || pokemonList === void 0 ? void 0 : pokemonList.map(obj => {
                return fetch(obj.url)
                    .then(response => response.json());
            });
            requests === null || requests === void 0 ? void 0 : requests.forEach((request) => {
                return Promise.all(requests)
                    .then(responses => {
                    responses.forEach(response => {
                        addPokemon(response.name, response.sprites.front_default);
                    });
                });
            });
        });
    }
});
function addPokemon(pokemon, pokemonImage) {
    const $li = document.createElement('li');
    const $div = document.createElement('div');
    $div.classList.add('pokemon-listing');
    $div.innerHTML = `
    <figure>
      <img class="pokeball" src="${pokeball_png_1.default}" alt="small pokeball" />
      <img class="card-image" src="${pokemonImage}" alt="${capitalizeName(pokemon)}" />
      <figcaption><a id=${pokemon} href="${pokemon_html_1.default}">${capitalizeName(pokemon)}></a></figcaption>
    </figure>
  `;
    $ul === null || $ul === void 0 ? void 0 : $ul.append($li);
    $li === null || $li === void 0 ? void 0 : $li.append($div);
    $spinner.classList.add('hidden');
    const $a = $div.querySelector("figure>figcaption>a");
    $a === null || $a === void 0 ? void 0 : $a.addEventListener("click", (event) => {
        localStorage.setItem("pokemon", pokemon);
    });
}
function displayLoadingIcon() {
    $spinner.classList.add('spinner');
    $spinner.src = '../images/loading-icon.gif';
    if ($main) {
        $main.append($spinner);
    }
}
function capitalizeName(word) {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1, word.length)}`;
}
