const notesContainer = document.querySelector(".notes__preview");
const createButton = document.querySelector(".notes__add");


//load saved notes
function showNotes(){
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(note => {
        createNoteWithContent(note.id, note.content, note.noteTitle);
    });
}
showNotes();

//create a new note with a unique id and content
function createNoteWithContent(noteId, content = "", noteTitle=""){
    let inputBox = document.createElement("div");
    let trashIcon = document.createElement('i');
    let inputText = document.createElement('p');
    let inputTitle = document.createElement('h1');

    inputBox.className = "input-box";
    inputText.className = "content";
    inputText.setAttribute("contenteditable", "true");
    inputTitle.setAttribute("contenteditable", "true");
    inputText.innerHTML = content;
    inputTitle.innerHTML = noteTitle;
    inputTitle.innerHTML = noteTitle;

    trashIcon.className = "fa-solid fa-trash trash-icon";
    inputTitle.className = "noteTitle";

    // Set unique ID as a data attribute
    inputBox.dataset.noteId = noteId;

    inputBox.appendChild(inputTitle);
    inputBox.appendChild(inputText);
    inputBox.appendChild(trashIcon);
    
    notesContainer.appendChild(inputBox);
}

//update the notes content in local storage
function updatesStorage(){
    const notes = document.querySelectorAll(".input-box");
    const notesArray = Array.from(notes).map(note => {
        return{
            id: note.dataset.noteId, 
            content: note.querySelector(".content").innerHTML,
            noteTitle: note.querySelector(".noteTitle").innerHTML

        };
    });
    localStorage.setItem("notes", JSON.stringify(notesArray));
}

//remove note by clicking trash-icon + update storage
notesContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("trash-icon")){
        e.target.closest(".input-box").remove();
        updatesStorage();
    }
});

//add a new note after clicking add button + update Storage
createButton.addEventListener("click", () => {
    const noteId = "note-" + new Date().getTime();
    createNoteWithContent(noteId);
    updatesStorage();
});

//update Storage if anything add in the box
notesContainer.addEventListener("input", function (e) {
    if (e.target.classList.contains("content", "noteTitle")) {
        updatesStorage();
    }
});

//tap return = go to next line
document.addEventListener("keydown", event =>{
    if(event.key ==="Return"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

//make it cannot delete trash-icon
notesContainer.addEventListener("keydown", function(e) {
    if (e.target.classList.contains("trash-icon")) {
        // Prevent delete/backspace key from removing the trash icon
        if (e.key === "Delete") {
            e.preventDefault();
        }
    }
});