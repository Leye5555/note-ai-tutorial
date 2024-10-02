const btn = document.querySelector("#btn");
const submitBtn = document.getElementById("submit");
const updateBtn = document.getElementById("update");
const deleteBtn = document.getElementById("delete");
const updateBtnWrap = document.querySelector(".updates");
const titleTag = document.getElementById("title");
const noteTag = document.getElementById("note");
const noteList = document.querySelector(".note-list");
const noteItem = document.querySelector(".note-list-item");
const noteTitle = document.querySelector(".note-list-item > h2");

updateBtnWrap.style.display = "none";
// btn.addEventListener("click", createNote);
btn.onclick = openNote;
submitBtn.onclick = createNote;
deleteBtn.onclick = deleteNote;
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
  updateBtnWrap.setAttribute("hidden", "hidden");
  updateBtnWrap.style.display = "none";
  updateBtn.setAttribute("disabled", "disabled");
  deleteBtn.setAttribute("disabled", "disabled");
}

function createNote(event) {
  if (titleTag.value === "" || noteTag.value === "") {
    alert("Notes cannot have empty fields");
    return;
  }
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
  titleTag.value = "";
  noteTag.value = "";
  updateBtnWrap.style.display = "none";

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
  deleteBtn.setAttribute("data-id", id);

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

  updateBtnWrap.removeAttribute("hidden");
  updateBtnWrap.style.display = "flex";

  updateBtn.removeAttribute("disabled");
  deleteBtn.removeAttribute("disabled");

  updateBtn.addEventListener("click", updateNote);
}

function updateNote(event) {
  if (titleTag.value === "" || noteTag.value === "") {
    alert("Notes cannot have empty fields");
    return;
  }
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
      if (item.id === id) {
        index = idx;
        return item.id === id;
      }
    });

    filteredNote[0].title = titleTag.value;
    filteredNote[0].content = noteTag.value;
    notesObj.splice(index, 1, filteredNote[0]);
    console.log("all notes", notesObj);
    window.localStorage.setItem("notes", JSON.stringify(notesObj));

    titleTag.value = "";
    noteTag.value = "";
    updateBtnWrap.style.display = "none";
    submitBtn.removeAttribute("hidden");
    submitBtn.removeAttribute("disabled");
    getNotes();
  }
}

function deleteNote(event) {
  const id = event.target.dataset.id;

  const existingNotes = window.localStorage.getItem("notes");
  if (!existingNotes) {
    return;
  } else if (existingNotes === "undefined" || existingNotes === "null") {
    return;
  } else if (existingNotes) {
    const notesObj = JSON.parse(existingNotes);
    let index = 0;
    const filteredNotes = notesObj.filter((item, idx) => {
      return item.id !== id;
    });

    window.localStorage.setItem("notes", JSON.stringify(filteredNotes));
    titleTag.value = "";
    noteTag.value = "";
    updateBtnWrap.style.display = "none";
    submitBtn.removeAttribute("hidden");
    submitBtn.removeAttribute("disabled");
    getNotes();
  }
}
