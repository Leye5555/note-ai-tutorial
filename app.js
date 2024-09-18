const btn = document.querySelector("#btn");
const submitBtn = document.getElementById("submit");
const updateBtn = document.getElementById("update");
const titleTag = document.getElementById("title");
const noteTag = document.getElementById("note");
const noteList = document.querySelector(".note-list");
const noteItem = document.querySelector(".note-list-item");
const noteTitle = document.querySelector(".note-list-item > h2");
// btn.addEventListener("click", createNote);
btn.onclick = openNote;
submitBtn.onclick = createNote;

function generateUID(size) {
  // const random = Math.floor(Math.random() * 10 ** size);
  const random = Math.floor(Math.random() * Math.pow(10, size));
  const hex = random.toString(16);
  console.log(hex);
  return hex;
}

function openNote(event) {
  noteTag.focus();
  noteTag.value = "";
  titleTag.value = "";
  submitBtn.removeAttribute("data-id");
  submitBtn.textContent = "Create Note";
  submitBtn.removeAttribute("hidden");
  submitBtn.removeAttribute("disabled");
  updateBtn.setAttribute("hidden", "hidden");
  updateBtn.setAttribute("disabled", "disabled");
}

function createNote(event) {
  const existingNotes = window.localStorage.getItem("notes");
  let notes = [];
  const note = {
    title: titleTag.value,
    content: noteTag.value,
    id: generateUID(16),
  };

  if (!existingNotes) {
    notes.push(note);
    window.localStorage.setItem("notes", JSON.stringify(notes));
  } else if (existingNotes === "undefined" || existingNotes === "null") {
    window.localStorage.removeItem("notes");
    notes.push(note);
    window.localStorage.setItem("notes", JSON.stringify(notes));
  } else if (existingNotes) {
    const notesObj = JSON.parse(existingNotes);
    notesObj.push(note);
    window.localStorage.setItem("notes", JSON.stringify(notesObj));
  }
  getNotes();
}

function getNotes() {
  const existingNotes = window.localStorage.getItem("notes");
  if (!existingNotes) {
    return;
  } else if (existingNotes === "undefined" || existingNotes === "null") {
    return;
  } else if (existingNotes) {
    noteList.innerHTML = "";
    const notesObj = JSON.parse(existingNotes);
    notesObj.forEach((item, index) => {
      const clonedNoteItem = noteItem.cloneNode(true); // deep clone will receive a true argument
      clonedNoteItem.children[0].textContent = item.title;
      clonedNoteItem.children[0].setAttribute("data-id", item.id);

      noteList.appendChild(clonedNoteItem);
    });
  }

  // add events to all the note items
  const allListItems = document.querySelectorAll(".note-list-item");
  allListItems.forEach(function (item) {
    item.addEventListener("click", readNote);
  });
}

getNotes();

function readNote(event) {
  const id = event.target.dataset.id;
  updateBtn.textContent = "Update Note";
  updateBtn.setAttribute("data-id", id);
  const existingNotes = window.localStorage.getItem("notes");
  if (!existingNotes) {
    return;
  } else if (existingNotes === "undefined" || existingNotes === "null") {
    return;
  } else if (existingNotes) {
    const notesObj = JSON.parse(existingNotes);
    const filteredNote = notesObj.filter((item) => item.id === id);
    titleTag.value = filteredNote[0].title;
    noteTag.value = filteredNote[0].content;
  }
  submitBtn.setAttribute("hidden", "hidden");
  submitBtn.setAttribute("disabled", "disabled");

  updateBtn.removeAttribute("hidden");
  updateBtn.removeAttribute("disabled");
  updateBtn.addEventListener("click", updateNote);
}

function updateNote(event) {
  const id = event.target.dataset.id;

  const existingNotes = window.localStorage.getItem("notes");
  if (!existingNotes) {
    return;
  } else if (existingNotes === "undefined" || existingNotes === "null") {
    return;
  } else if (existingNotes) {
    const notesObj = JSON.parse(existingNotes);
    let index = 0;
    const filteredNote = notesObj.filter((item, idx) => {
      index = idx;
      return item.id === id;
    });
    filteredNote[0].title = titleTag.value;
    filteredNote[0].content = noteTag.value;
    notesObj.splice(index, 1, filteredNote[0]);

    window.localStorage.setItem("notes", JSON.stringify(notesObj));

    getNotes();
  }
}
