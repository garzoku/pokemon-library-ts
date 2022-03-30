const body = document.querySelector("body")
// create a pokemon listing
const listingDiv = document.createElement("div")
listingDiv.className = "pokemon - listing"
// create fig
const listingFig = document.createElement("figure")
// create img
const listingImage = document.createElement("img")
listingImage.src = "pokemon-image-url-goes-here.jpg"
listingImage.alt = "Pokemon Name Goes Here"
// create figcaption
const listingFigCaption = document.createElement("figcaption")
const listingA = document.createElement("a")
listingA.href = "pokemon.html?pokemon=pokemon-id-goes-here"
listingA.textContent = "Pokemon Name Goes Here"
// append items
body.append(listingDiv)
listingDiv.append(listingFig)
listingFig.append(listingImage)
listingFig.append(listingFigCaption)
listingFigCaption.append(listingA)