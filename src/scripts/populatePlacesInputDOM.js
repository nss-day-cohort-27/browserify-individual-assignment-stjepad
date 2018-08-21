const dataManager = require("./dataManager")
const placesInputDOM = require("./placesInputDOM")
const placesCardDOM = require("./placesCardDOM")




const populatePlacesInputDOM = function () {





    document.querySelector(".saveEntryButton").addEventListener("click", () => {

        // get form field values
        // creat object from them
        // add timestamp



            // console.log("bloop", userObject)
            const newEntry = {
                place: document.querySelector("#entryPlace").value,
                city: document.querySelector("#entryCity").value,
                country: document.querySelector("#entryCountry").value,
                year: document.querySelector("#entryYear").value,
                textArea: document.querySelector("#entryTextArea").value,
                continent: document.querySelector("#optionButton").value,
                picture: document.querySelector("#entryPicture").value

            }

            // post to api
            dataManager.saveData(newEntry).then(() => {

                // clear form fields
                placesInputDOM.clearForm()

                // put html representation to DOM
                document.querySelector("#messageEntriesDOM").innerHTML = "";
                dataManager.getData().then(result => {
                    result.forEach(entry => {


                        document.querySelector("#messageEntriesDOM").innerHTML += placesCardDOM.renderCardForm(entry)

                    })
                })

            })

    })

}

module.exports = populatePlacesInputDOM