const placesInputDOM = Object.create(null, {
    clearForm: {
        value: () => {
            document.querySelector("#entryPlace").value = " ",

                document.querySelector("#entryCity").value = " ",

                document.querySelector("#entryCountry").value = " ",

                document.querySelector("#entryYear").value = " ",

                document.querySelector("#entryTextArea").value = " "

                document.querySelector("#optionButton").value = ""

                document.querySelector("#entryPicture").value = ""
            }
    },

    renderEntryForm: {
        value: () => {
            return `
                <div class = "wrapperInputDOM">

                <div class = "inputDOM">

                <input placeholder =" Place" required type="text" name="entryTitle" class= "entryTitle" id="entryPlace" >

                <input placeholder =" City" required type="text" name="entryTitle" class= "entryTitle" id="entryCity">

                <input placeholder =" Country" required type="text" name="entryTitle" class= "entryTitle" id="entryCountry">

                <input placeholder =" Year" required type="text" name="entryTitle" class= "entryTitle" id="entryYear">

                <select required id ="optionButton" class = "optionButton">
                    <option value= "">Pick a Continent</option>
                    <option value="Africa">Africa</option>
                    <option value="Antarctica">Antartica</option>
                    <option value="Asia">Asia</option>
                    <option value="Australia">Australia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                </select>

                <textarea placeholder =" What I loved" class= "entryTitle" id="entryTextArea" rows="12"></textarea>


                <input placeholder =" Picture URL" required type="text" name="entryTitle" class= "entryTitle" id="entryPicture">

                <button class="saveEntryButton">Save </button>

            </div>

            </div>`
        }
    }
})

module.exports = placesInputDOM