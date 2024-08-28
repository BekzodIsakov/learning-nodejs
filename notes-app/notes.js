const fs = require("node:fs");

function getNotes() {
  try {
    const readFileSync = fs.readFileSync;
    const buffer = readFileSync("./notes.json");
    return JSON.parse(buffer.toString());
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  const dataJSON = JSON.stringify(notes, null, 2);
  fs.writeFileSync("./notes.json", dataJSON);
}

function addNote(title, body) {
  const notes = getNotes();
  console.log("Adding a new note...");

  const duplicateNote = notes.some((note) => note.title === title);

  if (duplicateNote) {
    console.error(`Title "${title}" already exists!`);
  } else {
    notes.push({ title, body });
    saveNotes(notes);
    console.log("New note added!");
  }
}

function removeNote(title) {
  console.log("Removing a note...");
  const notes = getNotes();

  const noteExists = notes.some((note) => note.title === title);
  if (!noteExists) {
    return console.log("Note does not exist!");
  }

  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  console.log("Note removed!");
}

function listNotes() {
  console.log("Listing all notes...");
  const notes = getNotes();

  notes.forEach((note) => console.log(note.title));
}

function readNote(title) {
  console.log("Reading a note...");

  const notes = getNotes();
  const note = notes.find((note) => note.title === title);

  if (!note) {
    return console.log("Note not found!");
  }

  console.log(note);
}

module.exports = {
  getNotes,
  saveNotes,
  addNote,
  removeNote,
  listNotes,
  readNote,
};
