const app = document.querySelector("#app")
const main = document.querySelector("main")
const $ul = document.querySelector(".pokemon")
const pokemonLibrary = document.querySelector("h1 a")
const spinner = document.createElement("img")

window.addEventListener('DOMContentLoaded', (event) => {
    displayLoadingIcon();
});

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

function displayLoadingIcon() {
    spinner.classList.add("spinner")
    spinner.src = "loading-icon.gif"
    main.append(spinner)
}

function buildListing(pokemon) {
    const $li = document.createElement("li")
    // create a pokemon listing
    const listingDiv = document.createElement("div")
    listingDiv.className = "pokemon-listing"
    // create fig
    const listingFig = document.createElement("figure")
    // create img
    const listingImage = document.createElement("img")
    // create figcaption
    const listingFigCaption = document.createElement("figcaption")
    const listingA = document.createElement("a")
    $ul.append($li)
    $li.append(listingDiv)
    listingDiv.append(listingFig)
    listingFig.append(listingImage)
    listingFig.append(listingFigCaption)
    listingFigCaption.append(listingA)
    fillListing(pokemon)


    function fillListing(pokemon) {
        listingA.href = "pokemon.html"//fetch(`${pokemon.forms[0].url}`).then(response => response.json())
        listingA.textContent = capitalizeName(pokemon.name)
        listingImage.src = pokemon.sprites.front_default
        listingImage.alt = capitalizeName(pokemon.name)
    }
    spinner.classList.add("hidden")
}

function capitalizeName(string) {
    return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.Length)
        }`
}