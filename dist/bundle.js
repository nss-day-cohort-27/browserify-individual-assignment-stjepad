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
        <img class = "img" src="${data.picture}">
            <p class = "entryContent" id= "city--${data.id}">${data.city}</p>
            <p class = "entryContent" id= "country--${data.id}">${data.country}</p>
            <p class = "entryContent" id= "year--${data.id}">${data.year}</p>
            <p class = "entryContent" id= "continent--${data.id}">${data.continent}</p>
            <p class = "entryPicture" id= "textArea--${data.id}">${data.textArea}</p>



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
},{"./dataManager":1,"./placesCardDOM":3,"./placesInputDOM":4}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzY3JpcHRzL2RhdGFNYW5hZ2VyLmpzIiwic2NyaXB0cy9tYWluLmpzIiwic2NyaXB0cy9wbGFjZXNDYXJkRE9NLmpzIiwic2NyaXB0cy9wbGFjZXNJbnB1dERPTS5qcyIsInNjcmlwdHMvcG9wdWxhdGVFeGlzdGluZ1BsYWNlc0NhcmRET00uanMiLCJzY3JpcHRzL3BvcHVsYXRlUGxhY2VzSW5wdXRET00uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zb2xlLmxvZyhcIkJMT09QXCIpXG5cbmNvbnN0IGRhdGFNYW5hZ2VyID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG5cbiAgICBnZXREYXRhOiB7XG4gICAgICAgIHZhbHVlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2VcIikudGhlbihyID0+IHIuanNvbigpKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldFNpbmdsZURhdGE6IHtcbiAgICAgICAgdmFsdWU6IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtpZH1gKS50aGVuKHIgPT4gci5qc29uKCkpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVsZXRlRGF0YToge1xuICAgICAgICB2YWx1ZTogKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9wbGFjZS8ke2lkfWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcbiAgICAgICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24pXG4gICAgICAgIH19LFxuICAgICAgICBzYXZlRGF0YToge1xuICAgICAgICAgICAgdmFsdWU6IChuZXdFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9wbGFjZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3RW50cnkpXG4gICAgICAgICAgICAgICAgfSkudGhlbihyID0+IHIuanNvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVwbGFjZURhdGE6IHtcbiAgICAgICAgICAgIHZhbHVlOiAoZW50cnlJZCwgZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2VudHJ5SWR9YCwge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZW50cnkpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0Lmpzb24oKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiB9KVxuXG4gbW9kdWxlLmV4cG9ydHMgPSBkYXRhTWFuYWdlciIsImNvbnNvbGUubG9nKFwiTWVvV1wiKVxuY29uc3QgcGxhY2VzSW5wdXRET009IHJlcXVpcmUoXCIuL3BsYWNlc0lucHV0RE9NXCIpXG5jb25zdCBwb3B1bGF0ZVBsYWNlc0lucHV0RE9NPSByZXF1aXJlKFwiLi9wb3B1bGF0ZVBsYWNlc0lucHV0RE9NXCIpXG5jb25zdCBwb3B1bGF0ZUV4aXN0aW5nUGxhY2VDYXJkRE9NPSByZXF1aXJlKFwiLi9wb3B1bGF0ZUV4aXN0aW5nUGxhY2VzQ2FyZERPTVwiKVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2lucHV0Rm9ybVwiKS5pbm5lckhUTUwgPSBwbGFjZXNJbnB1dERPTS5yZW5kZXJFbnRyeUZvcm0oKVxucG9wdWxhdGVQbGFjZXNJbnB1dERPTSgpXG5wb3B1bGF0ZUV4aXN0aW5nUGxhY2VDYXJkRE9NKCkiLCJcbiAgICBjb25zdCBwbGFjZXNDYXJkRE9NID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XG5cbiAgICAgICAgcmVuZGVyQ2FyZEZvcm06IHtcbiAgICAgICAgICAgIHZhbHVlOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwibW1tbW1vb29vb29vb29vXCIsIGRhdGEpXG5yZXR1cm4gYFxuICAgIDxkaXYgY2xhc3MgPSBcIndyYXBwZXJcIiA+XG4gICAgICAgIDxkaXYgY2xhc3MgPSBcImVudHJpZXNET01cIj5cblxuICAgICAgICA8cCBjbGFzcyA9IFwiZW50cnlDb250ZW50XCIgaWQ9IFwicGxhY2UtLSR7ZGF0YS5pZH1cIj4ke2RhdGEucGxhY2V9PC9wPlxuICAgICAgICA8aW1nIGNsYXNzID0gXCJpbWdcIiBzcmM9XCIke2RhdGEucGljdHVyZX1cIj5cbiAgICAgICAgICAgIDxwIGNsYXNzID0gXCJlbnRyeUNvbnRlbnRcIiBpZD0gXCJjaXR5LS0ke2RhdGEuaWR9XCI+JHtkYXRhLmNpdHl9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3MgPSBcImVudHJ5Q29udGVudFwiIGlkPSBcImNvdW50cnktLSR7ZGF0YS5pZH1cIj4ke2RhdGEuY291bnRyeX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcyA9IFwiZW50cnlDb250ZW50XCIgaWQ9IFwieWVhci0tJHtkYXRhLmlkfVwiPiR7ZGF0YS55ZWFyfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzID0gXCJlbnRyeUNvbnRlbnRcIiBpZD0gXCJjb250aW5lbnQtLSR7ZGF0YS5pZH1cIj4ke2RhdGEuY29udGluZW50fTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzID0gXCJlbnRyeVBpY3R1cmVcIiBpZD0gXCJ0ZXh0QXJlYS0tJHtkYXRhLmlkfVwiPiR7ZGF0YS50ZXh0QXJlYX08L3A+XG5cblxuXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzID0gXCJkZWxldGVCdXR0b25cIiBpZCA9IFwiZGVsZXRlLS0ke2RhdGEuaWR9XCI+RGVsZXRlIDwvQnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gXG59XG59LFxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBwbGFjZXNDYXJkRE9NIiwiY29uc3QgcGxhY2VzSW5wdXRET00gPSBPYmplY3QuY3JlYXRlKG51bGwsIHtcbiAgICBjbGVhckZvcm06IHtcbiAgICAgICAgdmFsdWU6ICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlQbGFjZVwiKS52YWx1ZSA9IFwiIFwiLFxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUNpdHlcIikudmFsdWUgPSBcIiBcIixcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDb3VudHJ5XCIpLnZhbHVlID0gXCIgXCIsXG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5WWVhclwiKS52YWx1ZSA9IFwiIFwiLFxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeVRleHRBcmVhXCIpLnZhbHVlID0gXCIgXCJcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3B0aW9uQnV0dG9uXCIpLnZhbHVlID0gXCJcIlxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeVBpY3R1cmVcIikudmFsdWUgPSBcIlwiXG4gICAgICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlckVudHJ5Rm9ybToge1xuICAgICAgICB2YWx1ZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzID0gXCJ3cmFwcGVySW5wdXRET01cIj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3MgPSBcImlucHV0RE9NXCI+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXIgPVwiIFBsYWNlXCIgcmVxdWlyZWQgdHlwZT1cInRleHRcIiBuYW1lPVwiZW50cnlUaXRsZVwiIGNsYXNzPSBcImVudHJ5VGl0bGVcIiBpZD1cImVudHJ5UGxhY2VcIiA+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXIgPVwiIENpdHlcIiByZXF1aXJlZCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbnRyeVRpdGxlXCIgY2xhc3M9IFwiZW50cnlUaXRsZVwiIGlkPVwiZW50cnlDaXR5XCI+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXIgPVwiIENvdW50cnlcIiByZXF1aXJlZCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbnRyeVRpdGxlXCIgY2xhc3M9IFwiZW50cnlUaXRsZVwiIGlkPVwiZW50cnlDb3VudHJ5XCI+XG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXIgPVwiIFllYXJcIiByZXF1aXJlZCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbnRyeVRpdGxlXCIgY2xhc3M9IFwiZW50cnlUaXRsZVwiIGlkPVwiZW50cnlZZWFyXCI+XG5cbiAgICAgICAgICAgICAgICA8c2VsZWN0IHJlcXVpcmVkIGlkID1cIm9wdGlvbkJ1dHRvblwiIGNsYXNzID0gXCJvcHRpb25CdXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT0gXCJcIj5QaWNrIGEgQ29udGluZW50PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBZnJpY2FcIj5BZnJpY2E8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFudGFyY3RpY2FcIj5BbnRhcnRpY2E8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFzaWFcIj5Bc2lhPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBdXN0cmFsaWFcIj5BdXN0cmFsaWE8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkV1cm9wZVwiPkV1cm9wZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTm9ydGggQW1lcmljYVwiPk5vcnRoIEFtZXJpY2E8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNvdXRoIEFtZXJpY2FcIj5Tb3V0aCBBbWVyaWNhPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcGxhY2Vob2xkZXIgPVwiIFdoYXQgSSBsb3ZlZFwiIGNsYXNzPSBcImVudHJ5VGl0bGVcIiBpZD1cImVudHJ5VGV4dEFyZWFcIiByb3dzPVwiMTJcIj48L3RleHRhcmVhPlxuXG5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXIgPVwiIFBpY3R1cmUgVVJMXCIgcmVxdWlyZWQgdHlwZT1cInRleHRcIiBuYW1lPVwiZW50cnlUaXRsZVwiIGNsYXNzPSBcImVudHJ5VGl0bGVcIiBpZD1cImVudHJ5UGljdHVyZVwiPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNhdmVFbnRyeUJ1dHRvblwiPlNhdmUgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgIH1cbiAgICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBsYWNlc0lucHV0RE9NIiwiY29uc3QgZGF0YU1hbmFnZXI9IHJlcXVpcmUoXCIuL2RhdGFNYW5hZ2VyXCIpXG5jb25zdCBwbGFjZXNDYXJkRE9NPSByZXF1aXJlKFwiLi9wbGFjZXNDYXJkRE9NXCIpXG4vLyBjb25zdCBlZGl0TWFuYWdlcj0gcmVxdWlyZShcIi4vZWRpdE1lc3NhZ2VzRE9NXCIpXG5cbi8vIEdFVCBBTEwgRU5UUklFUyBPTlRPIFRIRSBET01cbmZ1bmN0aW9uIHBvcHVsYXRlRXhpc3RpbmdQbGFjZUNhcmRET00oKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlRW50cmllc0RPTVwiKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGRhdGFNYW5hZ2VyLmdldERhdGEoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3VsdC5sZW5ndGgpXG4gICAgICAgIHJlc3VsdC5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgIC8vIHB1dHMgZXhpc3RpbmcgbWVzc2FnZXMgb250byBET01cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZUVudHJpZXNET01cIikuaW5uZXJIVE1MICs9IHBsYWNlc0NhcmRET00ucmVuZGVyQ2FyZEZvcm0oZW50cnkpXG4gICAgICAgIH0pXG5cbiAgICB9KVxufVxuLy8gcG9wdWxhdGVFeGlzdGluZ1BsYWNlQ2FyZERPTSgpXG5cbi8vIERlbGV0ZSBCdXR0b25cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZUVudHJpZXNET01cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBpZihldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVswXSA9PT0gXCJkZWxldGVcIil7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiSGV5IVwiLCBldmVudC50YXJnZXQuaWQpO1xuICAgICAgICBsZXQgaWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhpZCk7XG4gICAgICAgIC8vY2FsbHMgdGhlIGRlbGV0ZUVudHJpZXMgZnVuY3Rpb24gc28gdGhhdCB0aGUgZW50cnkgaXMgZGVsZXRlZCBvbiB0aGUgRGF0YWJhc2UuXG4gICAgICAgIGRhdGFNYW5hZ2VyLmRlbGV0ZURhdGEoaWQpLnRoZW4oKCk9PiB7XG4gICAgICAgICAgICBwb3B1bGF0ZUV4aXN0aW5nUGxhY2VDYXJkRE9NKClcbiAgICAgICAgfSlcblxuICAgIH1cblxuXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBvcHVsYXRlRXhpc3RpbmdQbGFjZUNhcmRET00iLCJjb25zdCBkYXRhTWFuYWdlciA9IHJlcXVpcmUoXCIuL2RhdGFNYW5hZ2VyXCIpXG5jb25zdCBwbGFjZXNJbnB1dERPTSA9IHJlcXVpcmUoXCIuL3BsYWNlc0lucHV0RE9NXCIpXG5jb25zdCBwbGFjZXNDYXJkRE9NID0gcmVxdWlyZShcIi4vcGxhY2VzQ2FyZERPTVwiKVxuXG5cblxuXG5jb25zdCBwb3B1bGF0ZVBsYWNlc0lucHV0RE9NID0gZnVuY3Rpb24gKCkge1xuXG5cblxuXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNhdmVFbnRyeUJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXG4gICAgICAgIC8vIGdldCBmb3JtIGZpZWxkIHZhbHVlc1xuICAgICAgICAvLyBjcmVhdCBvYmplY3QgZnJvbSB0aGVtXG4gICAgICAgIC8vIGFkZCB0aW1lc3RhbXBcblxuXG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmxvb3BcIiwgdXNlck9iamVjdClcbiAgICAgICAgICAgIGNvbnN0IG5ld0VudHJ5ID0ge1xuICAgICAgICAgICAgICAgIHBsYWNlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5UGxhY2VcIikudmFsdWUsXG4gICAgICAgICAgICAgICAgY2l0eTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUNpdHlcIikudmFsdWUsXG4gICAgICAgICAgICAgICAgY291bnRyeTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUNvdW50cnlcIikudmFsdWUsXG4gICAgICAgICAgICAgICAgeWVhcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeVllYXJcIikudmFsdWUsXG4gICAgICAgICAgICAgICAgdGV4dEFyZWE6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlUZXh0QXJlYVwiKS52YWx1ZSxcbiAgICAgICAgICAgICAgICBjb250aW5lbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjb3B0aW9uQnV0dG9uXCIpLnZhbHVlLFxuICAgICAgICAgICAgICAgIHBpY3R1cmU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlQaWN0dXJlXCIpLnZhbHVlXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcG9zdCB0byBhcGlcbiAgICAgICAgICAgIGRhdGFNYW5hZ2VyLnNhdmVEYXRhKG5ld0VudHJ5KS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIGNsZWFyIGZvcm0gZmllbGRzXG4gICAgICAgICAgICAgICAgcGxhY2VzSW5wdXRET00uY2xlYXJGb3JtKClcblxuICAgICAgICAgICAgICAgIC8vIHB1dCBodG1sIHJlcHJlc2VudGF0aW9uIHRvIERPTVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVzc2FnZUVudHJpZXNET01cIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICBkYXRhTWFuYWdlci5nZXREYXRhKCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuZm9yRWFjaChlbnRyeSA9PiB7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlRW50cmllc0RPTVwiKS5pbm5lckhUTUwgKz0gcGxhY2VzQ2FyZERPTS5yZW5kZXJDYXJkRm9ybShlbnRyeSlcblxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG5cbiAgICB9KVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcG9wdWxhdGVQbGFjZXNJbnB1dERPTSJdfQ==
