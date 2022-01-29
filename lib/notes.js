const fs = require("fs");
const path = require("path");

//Find the note you want by its ID
function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

//Return the complete array, without the note which was selected for deleting.
//the ID passed into the function is the ID of the Note selected for deletion
function allButId(id, notesArray) {
  const result = notesArray.filter((note) => note.id !== id);
  return result;
}

/* This is a write file function that take a newly created array and writes it 
to the JSON file in the db folder, thus overwriting the older file. */
function overWritenote(newNotes) {
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(newNotes, null, 2)
  );
  return newNotes;
}

/* Function to updates the JSON file in the db (database) folder
The function updates the existing notes array with the data that is entered into the client terminal */
function createNewnote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return note;
}

/* Function to validate the data content entered from the client terminal meets 
our criteria of being a string */
function validatenote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }

  return true;
}

// Export these functions, they are used in the api routes files
module.exports = {
  findById,
  allButId,
  overWritenote,
  createNewnote,
  validatenote,
};

//--verbose test/*
