console.log("MeoW")
const placesInputDOM= require("./placesInputDOM")
const populatePlacesInputDOM= require("./populatePlacesInputDOM")
const populateExistingPlaceCardDOM= require("./populateExistingPlacesCardDOM")

document.querySelector("#inputForm").innerHTML = placesInputDOM.renderEntryForm()
populatePlacesInputDOM()
populateExistingPlaceCardDOM()