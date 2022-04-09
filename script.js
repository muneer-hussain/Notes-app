let popupOpenBtn = document.querySelector("#addNote");
let popup = document.querySelector("#pop-up-wrapper #pop-up");
let popupCloseBtn = document.querySelector("#closePopup")
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let addNoteBtn = document.querySelector("#pop-up-add-btn");
let menuDots = document.querySelector(".fa-pencil");
let tools = document.querySelector(".edit");
let PopupTitle = document.querySelector("#pop-up-written");

let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isupdate = false,
    updateId;

popupOpenBtn.addEventListener("click", () => {
    popup.style.display = "block";
    title.focus();
    addNoteBtn.textContent = "Add a note";
    PopupTitle.textContent = "Add a note"


})


popupCloseBtn.addEventListener("click", () => {
    isupdate = false;
    popup.style.display = "none";
    title.value = "";
    description.value = "";
})

// date 

function date() {
    let d = new Date();
    let month = d.getMonth();
    let date = d.getDate();
    let year = d.getFullYear();
    let day = d.getDay();

    let dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthName = ['January', 'February', 'March', "April", 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const fullDate = `${dayName[day]}, ${date} ${monthName[month]} ${year}` //full date
    return fullDate;
}

let descVal = description.value;
let titleVal = title.value;

function edit(noteNum, ttl, dsc) {
    isupdate = true;
    updateId = noteNum
    popupOpenBtn.click();
    title.value = ttl;
    description.value = dsc;
    addNoteBtn.textContent = "Update This Note";
    PopupTitle.textContent = "Update This Note"
}


addNoteBtn.addEventListener("click", () => {
    let dat = date()

    if (description.value || title.value) {
        let noteInfo = {
            title: title.value,
            desc: description.value,
            date: dat
        }
        if (!isupdate) {
            notes.push(noteInfo);
        } else {
            isupdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes))
    }
    popupCloseBtn.click()
    showNote();
    title.value = "";
    description.value = "";
})

function showNote() {
    document.querySelectorAll(".note").forEach(
        (note) => {
            note.remove();
        }
    )

    notes.forEach(
        (note, index) => {
            let noteHtml = `
            <span class="note">
                <div class="details">
                    <p class="title">${note.title}</p>
                    <span class="description">${note.desc}</span>
                </div>
                <i class="fa fa-pencil edit" onclick="edit(${index}, '${note.title}', '${note.desc}')" aria-hidden="true"></i>
                <i class="fa fa-trash" aria-hidden="true" onclick="dlt(${index})"></i>
                <span class="date">
                    ${note.date}
                </span>
            </span>    
            `
            popupOpenBtn.insertAdjacentHTML("afterend", noteHtml)
        });
}


function dlt(noteNum) {
    let conf = confirm("Are You Confirm You Wanna Delete This Note ?");

    if (!conf) {
        return;
    }
    notes.splice(noteNum, 1)
    localStorage.setItem("notes", JSON.stringify(notes))
    showNote();
}


showNote();