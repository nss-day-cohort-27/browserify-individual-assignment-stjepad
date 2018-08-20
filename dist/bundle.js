(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
console.log("BLOOP")

const dataManager = Object.create(null, {

    getData: {
        value: () => {
            return fetch("http://localhost:8088/place").then(r => r.json())
        }
    },

    getSingleData: {
        value: (id) => {
            return fetch(`http://localhost:8088/${id}`).then(r => r.json())
        }
    },

    deleteData: {
        value: (id) => {
            return fetch(`http://localhost:8088/place/${id}`, {
                method: "DELETE"
            }).then(r => r.json)
        }},
        saveData: {
            value: (newEntry) => {
                return fetch("http://localhost:8088/place", {
                    method: "POST",
                    headers: {

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEntry)
                }).then(r => r.json)
            }
        },
        replaceData: {
            value: (entryId, entry) => {
                return fetch(`http://localhost:8088/${entryId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(entry)
                })
                .then(result => result.json())
            }
        }


 })

 module.exports = dataManager
},{}],2:[function(require,module,exports){
console.log("MeoW")
const placesInputDOM= require("./placesInputDOM")
const populatePlacesInputDOM= require("./populatePlacesInputDOM")
const populateExistingPlaceCardDOM= require("./populateExistingPlacesCardDOM")

document.querySelector("#inputForm").innerHTML = placesInputDOM.renderEntryForm()
populatePlacesInputDOM()
populateExistingPlaceCardDOM()
},{"./placesInputDOM":4,"./populateExistingPlacesCardDOM":5,"./populatePlacesInputDOM":6}],3:[function(require,module,exports){

    const placesCardDOM = Object.create(null, {

        renderCardForm: {
            value: (data) => {
                // console.log("mmmmmoooooooooo", data)
return `
    <div class = "wrapper" >
        <div class = "entriesDOM">

            <p class = "entryContent" id= "place--${data.id}">${data.place}</p>
            <p class = "entryContent" id= "city--${data.id}">${data.city}</p>
            <p class = "entryContent" id= "country--${data.id}">${data.country}</p>
            <p class = "entryContent" id= "year--${data.id}">${data.year}</p>
            <p class = "entryContent" id= "continent--${data.id}">${data.continent}</p>
            <p class = "entryContent" id= "textArea--${data.id}">${data.textArea}</p>

            <button class = "deleteButton" id = "delete--${data.id}">Delete </Button>
        </div>
    </div>`
}
},
})

module.exports = placesCardDOM
},{}],4:[function(require,module,exports){
const placesInputDOM = Object.create(null, {
    clearForm: {
        value: () => {
            document.querySelector("#entryPlace").value = " ",

                document.querySelector("#entryCity").value = " ",

                document.querySelector("#entryCountry").value = " ",

                document.querySelector("#entryYear").value = " ",

                document.querySelector("#entryTextArea").value = " "

                document.querySelector("#optionButton").value = ""
        }
    },

    renderEntryForm: {
        value: () => {
            return `
                <div class = "wrapperInputDOM">

                <div class = "inputDOM">

                <input placeholder =" Place" required type="text" name="entryTitle" class= "entryTitle" id="entryPlace">

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
                    <option value="North America>North America</option>
                    <option value="South America">South America</option>
                </select>

                <textarea placeholder =" What I loved" class= "entryTitle" id="entryTextArea" rows="12"></textarea>

                <input placeholder =" Picture URL" required type="text" name="entryTitle" class= "entryTitle" id="entryTitle">

                <button class="saveEntryButton">Save </button>

            </div>

            </div>`
        }
    }
})

module.exports = placesInputDOM
},{}],5:[function(require,module,exports){
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
},{"./dataManager":1,"./placesCardDOM":3}],6:[function(require,module,exports){
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
                continent: document.querySelector("#optionButton").value


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
},{"./dataManager":1,"./placesCardDOM":3,"./placesInputDOM":4}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2RhdGFNYW5hZ2VyLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wbGFjZXNDYXJkRE9NLmpzIiwic2NyaXB0cy9wbGFjZXNJbnB1dERPTS5qcyIsInNjcmlwdHMvcG9wdWxhdGVFeGlzdGluZ1BsYWNlc0NhcmRET00uanMiLCJzY3JpcHRzL3BvcHVsYXRlUGxhY2VzSW5wdXRET00uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc29sZS5sb2coXCJCTE9PUFwiKVxuXG5jb25zdCBkYXRhTWFuYWdlciA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuXG4gICAgZ2V0RGF0YToge1xuICAgICAgICB2YWx1ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L3BsYWNlXCIpLnRoZW4ociA9PiByLmpzb24oKSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRTaW5nbGVEYXRhOiB7XG4gICAgICAgIHZhbHVlOiAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7aWR9YCkudGhlbihyID0+IHIuanNvbigpKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRlbGV0ZURhdGE6IHtcbiAgICAgICAgdmFsdWU6IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2UvJHtpZH1gLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gICAgICAgICAgICB9KS50aGVuKHIgPT4gci5qc29uKVxuICAgICAgICB9fSxcbiAgICAgICAgc2F2ZURhdGE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAobmV3RW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2VcIiwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0VudHJ5KVxuICAgICAgICAgICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlcGxhY2VEYXRhOiB7XG4gICAgICAgICAgICB2YWx1ZTogKGVudHJ5SWQsIGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtlbnRyeUlkfWAsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVudHJ5KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5qc29uKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gfSlcblxuIG1vZHVsZS5leHBvcnRzID0gZGF0YU1hbmFnZXIiLCJjb25zb2xlLmxvZyhcIk1lb1dcIilcbmNvbnN0IHBsYWNlc0lucHV0RE9NPSByZXF1aXJlKFwiLi9wbGFjZXNJbnB1dERPTVwiKVxuY29uc3QgcG9wdWxhdGVQbGFjZXNJbnB1dERPTT0gcmVxdWlyZShcIi4vcG9wdWxhdGVQbGFjZXNJbnB1dERPTVwiKVxuY29uc3QgcG9wdWxhdGVFeGlzdGluZ1BsYWNlQ2FyZERPTT0gcmVxdWlyZShcIi4vcG9wdWxhdGVFeGlzdGluZ1BsYWNlc0NhcmRET01cIilcblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnB1dEZvcm1cIikuaW5uZXJIVE1MID0gcGxhY2VzSW5wdXRET00ucmVuZGVyRW50cnlGb3JtKClcbnBvcHVsYXRlUGxhY2VzSW5wdXRET00oKVxucG9wdWxhdGVFeGlzdGluZ1BsYWNlQ2FyZERPTSgpIiwiXG4gICAgY29uc3QgcGxhY2VzQ2FyZERPTSA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuXG4gICAgICAgIHJlbmRlckNhcmRGb3JtOiB7XG4gICAgICAgICAgICB2YWx1ZTogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIm1tbW1tb29vb29vb29vb1wiLCBkYXRhKVxucmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzID0gXCJ3cmFwcGVyXCIgPlxuICAgICAgICA8ZGl2IGNsYXNzID0gXCJlbnRyaWVzRE9NXCI+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzID0gXCJlbnRyeUNvbnRlbnRcIiBpZD0gXCJwbGFjZS0tJHtkYXRhLmlkfVwiPiR7ZGF0YS5wbGFjZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcyA9IFwiZW50cnlDb250ZW50XCIgaWQ9IFwiY2l0eS0tJHtkYXRhLmlkfVwiPiR7ZGF0YS5jaXR5fTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzID0gXCJlbnRyeUNvbnRlbnRcIiBpZD0gXCJjb3VudHJ5LS0ke2RhdGEuaWR9XCI+JHtkYXRhLmNvdW50cnl9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3MgPSBcImVudHJ5Q29udGVudFwiIGlkPSBcInllYXItLSR7ZGF0YS5pZH1cIj4ke2RhdGEueWVhcn08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcyA9IFwiZW50cnlDb250ZW50XCIgaWQ9IFwiY29udGluZW50LS0ke2RhdGEuaWR9XCI+JHtkYXRhLmNvbnRpbmVudH08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcyA9IFwiZW50cnlDb250ZW50XCIgaWQ9IFwidGV4dEFyZWEtLSR7ZGF0YS5pZH1cIj4ke2RhdGEudGV4dEFyZWF9PC9wPlxuXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzID0gXCJkZWxldGVCdXR0b25cIiBpZCA9IFwiZGVsZXRlLS0ke2RhdGEuaWR9XCI+RGVsZXRlIDwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gXG59XG59LFxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBwbGFjZXNDYXJkRE9NIiwiY29uc3QgcGxhY2VzSW5wdXRET00gPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICBjbGVhckZvcm06IHtcbiAgICAgICAgdmFsdWU6ICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlQbGFjZVwiKS52YWx1ZSA9IFwiIFwiLFxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUNpdHlcIikudmFsdWUgPSBcIiBcIixcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDb3VudHJ5XCIpLnZhbHVlID0gXCIgXCIsXG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5WWVhclwiKS52YWx1ZSA9IFwiIFwiLFxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeVRleHRBcmVhXCIpLnZhbHVlID0gXCIgXCJcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3B0aW9uQnV0dG9uXCIpLnZhbHVlID0gXCJcIlxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlckVudHJ5Rm9ybToge1xuICAgICAgICB2YWx1ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJ3cmFwcGVySW5wdXRET01cIj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcImlucHV0RE9NXCI+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXIgPVwiIFBsYWNlXCIgcmVxdWlyZWQgdHlwZT1cInRleHRcIiBuYW1lPVwiZW50cnlUaXRsZVwiIGNsYXNzPSBcImVudHJ5VGl0bGVcIiBpZD1cImVudHJ5UGxhY2VcIj5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlciA9XCIgQ2l0eVwiIHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVudHJ5VGl0bGVcIiBjbGFzcz0gXCJlbnRyeVRpdGxlXCIgaWQ9XCJlbnRyeUNpdHlcIj5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlciA9XCIgQ291bnRyeVwiIHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVudHJ5VGl0bGVcIiBjbGFzcz0gXCJlbnRyeVRpdGxlXCIgaWQ9XCJlbnRyeUNvdW50cnlcIj5cblxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlciA9XCIgWWVhclwiIHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVudHJ5VGl0bGVcIiBjbGFzcz0gXCJlbnRyeVRpdGxlXCIgaWQ9XCJlbnRyeVllYXJcIj5cblxuICAgICAgICAgICAgICAgIDxzZWxlY3QgcmVxdWlyZWQgaWQgPVwib3B0aW9uQnV0dG9uXCIgY2xhc3MgPSBcIm9wdGlvbkJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPSBcIlwiPlBpY2sgYSBDb250aW5lbnQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFmcmljYVwiPkFmcmljYTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQW50YXJjdGljYVwiPkFudGFydGljYTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQXNpYVwiPkFzaWE8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkF1c3RyYWxpYVwiPkF1c3RyYWxpYTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRXVyb3BlXCI+RXVyb3BlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJOb3J0aCBBbWVyaWNhPk5vcnRoIEFtZXJpY2E8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNvdXRoIEFtZXJpY2FcIj5Tb3V0aCBBbWVyaWNhPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcGxhY2Vob2xkZXIgPVwiIFdoYXQgSSBsb3ZlZFwiIGNsYXNzPSBcImVudHJ5VGl0bGVcIiBpZD1cImVudHJ5VGV4dEFyZWFcIiByb3dzPVwiMTJcIj48L3RleHRhcmVhPlxuXG4gICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyID1cIiBQaWN0dXJlIFVSTFwiIHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVudHJ5VGl0bGVcIiBjbGFzcz0gXCJlbnRyeVRpdGxlXCIgaWQ9XCJlbnRyeVRpdGxlXCI+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2F2ZUVudHJ5QnV0dG9uXCI+U2F2ZSA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgfVxuICAgIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gcGxhY2VzSW5wdXRET00iLCJjb25zdCBkYXRhTWFuYWdlcj0gcmVxdWlyZShcIi4vZGF0YU1hbmFnZXJcIilcbmNvbnN0IHBsYWNlc0NhcmRET009IHJlcXVpcmUoXCIuL3BsYWNlc0NhcmRET01cIilcbi8vIGNvbnN0IGVkaXRNYW5hZ2VyPSByZXF1aXJlKFwiLi9lZGl0TWVzc2FnZXNET01cIilcblxuLy8gR0VUIEFMTCBFTlRSSUVTIE9OVE8gVEhFIERPTVxuZnVuY3Rpb24gcG9wdWxhdGVFeGlzdGluZ1BsYWNlQ2FyZERPTSgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VFbnRyaWVzRE9NXCIpLmlubmVySFRNTCA9IFwiXCI7XG4gICAgZGF0YU1hbmFnZXIuZ2V0RGF0YSgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocmVzdWx0Lmxlbmd0aClcbiAgICAgICAgcmVzdWx0LmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgICAgICAgLy8gcHV0cyBleGlzdGluZyBtZXNzYWdlcyBvbnRvIERPTVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlRW50cmllc0RPTVwiKS5pbm5lckhUTUwgKz0gcGxhY2VzQ2FyZERPTS5yZW5kZXJDYXJkRm9ybShlbnRyeSlcbiAgICAgICAgfSlcblxuICAgIH0pXG59XG4vLyBwb3B1bGF0ZUV4aXN0aW5nUGxhY2VDYXJkRE9NKClcblxuLy8gRGVsZXRlIEJ1dHRvblxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlRW50cmllc0RPTVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuICAgIGlmKGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzBdID09PSBcImRlbGV0ZVwiKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJIZXkhXCIsIGV2ZW50LnRhcmdldC5pZCk7XG4gICAgICAgIGxldCBpZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi0tXCIpWzFdXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGlkKTtcbiAgICAgICAgLy9jYWxscyB0aGUgZGVsZXRlRW50cmllcyBmdW5jdGlvbiBzbyB0aGF0IHRoZSBlbnRyeSBpcyBkZWxldGVkIG9uIHRoZSBEYXRhYmFzZS5cbiAgICAgICAgZGF0YU1hbmFnZXIuZGVsZXRlRGF0YShpZCkudGhlbigoKT0+IHtcbiAgICAgICAgICAgIHBvcHVsYXRlRXhpc3RpbmdQbGFjZUNhcmRET00oKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG5cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gcG9wdWxhdGVFeGlzdGluZ1BsYWNlQ2FyZERPTSIsImNvbnN0IGRhdGFNYW5hZ2VyID0gcmVxdWlyZShcIi4vZGF0YU1hbmFnZXJcIilcbmNvbnN0IHBsYWNlc0lucHV0RE9NID0gcmVxdWlyZShcIi4vcGxhY2VzSW5wdXRET01cIilcbmNvbnN0IHBsYWNlc0NhcmRET00gPSByZXF1aXJlKFwiLi9wbGFjZXNDYXJkRE9NXCIpXG5cblxuXG5cbmNvbnN0IHBvcHVsYXRlUGxhY2VzSW5wdXRET00gPSBmdW5jdGlvbiAoKSB7XG5cblxuXG5cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2F2ZUVudHJ5QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cbiAgICAgICAgLy8gZ2V0IGZvcm0gZmllbGQgdmFsdWVzXG4gICAgICAgIC8vIGNyZWF0IG9iamVjdCBmcm9tIHRoZW1cbiAgICAgICAgLy8gYWRkIHRpbWVzdGFtcFxuXG5cblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJibG9vcFwiLCB1c2VyT2JqZWN0KVxuICAgICAgICAgICAgY29uc3QgbmV3RW50cnkgPSB7XG4gICAgICAgICAgICAgICAgcGxhY2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlQbGFjZVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBjaXR5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5Q2l0eVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5Q291bnRyeVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICB5ZWFyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5WWVhclwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeVRleHRBcmVhXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbnRpbmVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvcHRpb25CdXR0b25cIikudmFsdWVcblxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBwb3N0IHRvIGFwaVxuICAgICAgICAgICAgZGF0YU1hbmFnZXIuc2F2ZURhdGEobmV3RW50cnkpLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgZm9ybSBmaWVsZHNcbiAgICAgICAgICAgICAgICBwbGFjZXNJbnB1dERPTS5jbGVhckZvcm0oKVxuXG4gICAgICAgICAgICAgICAgLy8gcHV0IGh0bWwgcmVwcmVzZW50YXRpb24gdG8gRE9NXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlRW50cmllc0RPTVwiKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGRhdGFNYW5hZ2VyLmdldERhdGEoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKGVudHJ5ID0+IHtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VFbnRyaWVzRE9NXCIpLmlubmVySFRNTCArPSBwbGFjZXNDYXJkRE9NLnJlbmRlckNhcmRGb3JtKGVudHJ5KVxuXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcblxuICAgIH0pXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb3B1bGF0ZVBsYWNlc0lucHV0RE9NIl19
