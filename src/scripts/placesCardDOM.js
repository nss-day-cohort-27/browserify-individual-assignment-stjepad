
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