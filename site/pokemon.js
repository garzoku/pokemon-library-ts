const app = document.querySelector("#app")
const pokemonLibrary = document.querySelector("h1 a")

fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
    .then((response) => response.json())
    .then((response) => {
        const pokemonList = response.results;
        const requests = pokemonList
            .map((pokemon) => pokemon.url)
            .map(url => {
                return fetch(url)
                    .then(response => response.json())
            })
        return Promise.all(requests)
    }).then(responses => {
        responses.map(response => {
            buildListing(response)
        })
    })

function buildListing(pokemon) {
}

function fillListing(pokemon) {

}
function capitalizeName(string) {
    return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.Length)
        }`
}