const noteContainer = document.getElementById("noteContainer");
const addNoteBtn = document.getElementById("addNoteBtn");
const editNoteBtn = document.getElementById("editNoteBtn");
const modalWrapper = document.getElementById("modal_wrapper");
const openModal = document.getElementById("openModal");
const closeModalBtn = document.getElementById("close");
const noteTitle = document.getElementById("noteTitle");
const noteDescritption = document.getElementById("noteDesc");

// Function to fetch the data from local storage.
const fetchData = () => {
  const notes = JSON.parse(localStorage.getItem("notes"));

  if (notes.length > 0) {
    noteContainer.innerHTML = "";
    Array.from(notes).map((note, idx) => {
      const noteCard = document.createElement("div");
      noteCard.classList.add("noteCard");
      noteCard.innerHTML = `<h3 class="noteHeading">${
        note.title.length > 120 ? note.title.slice(0, 120) + "..." : note.title
      }</h3>
      <p class="noteContent">
        ${
          note.description.length > 120
            ? note.description.slice(0, 120) + "..."
            : note.description
        }
      </p>
      <div class="menuButtons">
        <i class="fa-solid fa-edit" id=${idx} onClick="editHandler(this)"></i>
        <i class="fa-regular fa-trash-can" id=${idx} onClick="deleteHandler(this)"></i>
        <i class="fa-solid fa-copy" id=${idx} onClick="copyHandler(this)"></i>
      </div>`;
      noteContainer.append(noteCard);
    });
  } else {
    noteContainer.innerHTML = `<h2 style="color:white; font-size: 5rem;"> Please add notes </h2>`;
  }
};

document.addEventListener("DOMContentLoaded", () => fetchData());

// Funtion to add note.
const addNote = (title, description) => {
  try {
    const data = { title, description };
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(data);
    localStorage.setItem("notes", JSON.stringify(notes));
    fetchData();
  } catch (error) {}
};

// Add Note Handler.
addNoteBtn.addEventListener("click", () => {
  if (!noteTitle.value) {
    alert("Please enter title");
    return;
  }
  addNote(noteTitle.value, noteDescritption.value);
  modalWrapper.classList.remove("active");
});

// Copy Note Handler.
function copyHandler(e) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(notes[e.id]);
  localStorage.setItem("notes", JSON.stringify(notes));
  fetchData();
}

// Delete Note Handler
function deleteHandler(e) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(e.id, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  fetchData();
}

// Edit Note Handler.
function editHandler(e) {
  addNoteBtn.classList.remove("active");
  editNoteBtn.classList.add("active");
  editNoteBtn.classList.add(e.id);
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const note = notes[e.id];
  noteTitle.value = note.title;
  noteDescritption.value = note.description;
  modalWrapper.classList.add("active");
}

// Handling edit note button.
editNoteBtn.addEventListener("click", (e) => {
  const index = e.target.classList[e.target.classList.length-1];
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes[index].title = noteTitle.value;
  notes[index].description = noteDescritption.value;

  localStorage.setItem("notes", JSON.stringify(notes));
  fetchData();
  modalWrapper.classList.remove("active");
});

// Modal Handlers.
openModal.addEventListener("click", () => {
  noteTitle.value = "";
  noteDescritption.value = "";
  addNoteBtn.classList.add("active");
  editNoteBtn.classList.remove("active");
  modalWrapper.classList.add("active");
});

closeModalBtn.addEventListener("click", () => {
  modalWrapper.classList.remove("active");
});
