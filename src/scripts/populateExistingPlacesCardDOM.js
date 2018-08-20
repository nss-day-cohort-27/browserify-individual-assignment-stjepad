const dataManager= require("./dataManager")
const placesCardDOM= require("./placesCardDOM")
// const editManager= require("./editMessagesDOM")

// GET ALL ENTRIES ONTO THE DOM
function populateExistingPlaceCardDOM() {
    document.querySelector("#messageEntriesDOM").innerHTML = "";
    dataManager.getData().then(result => {
        // console.log(result.length)
        result.forEach(entry => {
            // puts existing messages onto DOM
            document.querySelector("#messageEntriesDOM").innerHTML += placesCardDOM.renderCardForm(entry)
        })

    })
}
// populateExistingPlaceCardDOM()

// Delete Button
document.querySelector("#messageEntriesDOM").addEventListener("click", (event) => {
    // console.log(event);
    if(event.target.id.split("--")[0] === "delete"){
        // console.log("Hey!", event.target.id);
        let id = event.target.id.split("--")[1]
        // console.log(id);
        //calls the deleteEntries function so that the entry is deleted on the Database.
        dataManager.deleteData(id).then(()=> {
            populateExistingPlaceCardDOM()
        })

    }


})

module.exports = populateExistingPlaceCardDOM