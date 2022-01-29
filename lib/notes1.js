const fs = require("fs");
const path = require("path");

function createNotes(notes, notesArray) {
  // Push note into notesArray
  notesArray.push(notes);

  // Write the updated value of the notesArray to the database
  fs.writeFileSync(
    path.join(__dirname, "../db/notes.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return notes;
}

function deleteNotes(id, notesArray) {
  // Filter out the note with the matching id
  notesArray = notesArray.filter((notes) => {
    if (notes.id !== id) {
      return notes;
    }
  });

  // Write the updated value of the notesArray to the database
  fs.writeFileSync(
    path.join(__dirname, "../db/notes.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return notesArray;
}

module.exports = {
  createNotes,
  deleteNotes,
};
