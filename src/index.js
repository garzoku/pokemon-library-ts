/*var $main;
var $ul;
var $spinner;
if (typeof window !== 'undefined') {
    $main = document.querySelector("main");
    $ul = document.querySelector("ul");
    $spinner = document.createElement('img');
}
else {
    console.log('You are on the server');
}
document.addEventListener('DOMContentLoaded', function (event) {
    displayLoadingIcon();
});
function addPokemon(pokemon) {
    var $li = document.createElement('li');
    var $div = document.createElement('div');
    $div.classList.add('pokemon-listing');
    $div.innerHTML = "\n    <figure>\n      <img class=\"pokeball\" src=\"images/pokeball.png\" alt=\"small pokeball\" />\n      <img class=\"card-image\" src=\"\" alt=\"".concat(capitalizeName(pokemon.name), "\" />\n      <figcaption><a href=\"pokemon.html?pokemon=").concat(pokemon.name, "\">").concat(capitalizeName(pokemon.name), "</a></figcaption>\n    </figure>\n  ");
    if ($ul && $li) {
        $ul.append($li);
        $li.append($div);
        $spinner.classList.add('hidden');
    }
}
if (typeof window !== 'undefined') {
    window.fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then(function (response) { return response.json(); })
        .then(function (response) {
            var _a;
            console.log(((_a = response.data) === null || _a === void 0 ? void 0 : _a.pokemon.name) || "");
        });
}
else {
    console.log('You are on the server');
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
/*
function displayLoadingIcon() {
 $spinner.classList.add('spinner');
 $spinner.src = './images/loading-icon.gif';
 console.log($spinner);
 if ($main) {
     // console.log($main)
     $main.append($spinner);
 }
}
function capitalizeName(name) {
 return "".concat(name.slice(0, 1).toUpperCase()).concat(name.slice(1, name.length));
}*/

