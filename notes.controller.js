const fs = require("fs/promises");
const path = require("path");
const notesPath = path.join(__dirname, "db.json");
const chalk = require("chalk");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgYellow("Notes list"));

  notes.forEach(({ id, title }) =>
    console.log(chalk.green(id), " - ", chalk.blue(title))
  );
}

async function deleteNote(id) {
  const notes = await getNotes();

  const editedNotes = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(editedNotes));
}

async function editNote(id, title) {
  const notes = await getNotes();

  const editedNotes = notes.map((note) =>
    note.id === id ? { ...note, title: title } : note
  );

  // console.log("editedNotes: ", editedNotes);

  await fs.writeFile(notesPath, JSON.stringify(editedNotes));
}

module.exports = {
  addNote,
  printNotes,
  getNotes,
  deleteNote,
  editNote,
};
