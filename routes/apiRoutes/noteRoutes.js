const router = require("express").Router();
const {
  allButId,
  overWritenote,
  createNewnote,
  validatenote,
} = require("../../lib/notes.js");
const notes = require("../../db/db.json");
console.log(notes); //we console log the notes array on the terminal to check functionality

// GET route to get data from db.json
router.get("/notes", (req, res) => {
  if (notes) {
    res.json(notes);
    console.log("get /notes");
    console.log(notes);
  } else {
    res.sendStatus(404);
    console.log("problem in GET noteRoute.js");
  }
});

// POST route to update data from client to db.json
router.post("/notes", (req, res) => {
  if (!validatenote(req.body)) {
    res.status(400).send("The note to POST is not properly formatted.");
  } else {
    req.body.id = 0 + new Date().getTime() + ""; //Make a new unique ID and convert it to a string
    const result = createNewnote(req.body, notes);
    res.json(result);
    console.log("post /notes");
    console.log(result);
  }
});

// DELETE route to update db.json after removing the deleted note identified by ID
router.delete("/notes/:id", (req, res) => {
  const result = {
    message: "There was an error processing your request", //defining the contents of the result array
    status: "ERROR",
    status_code: 500, //just a code
  };

  if (req.params.id) {
    result.deleted_note = req.params.id;
    const newNotes = allButId(req.params.id, notes); //newNotes is an array with does not include deleted note
    const output = overWritenote(newNotes); //the new array uses fs to overwrite JSON data
    result.message = `Note ${req.params.id} was deleted`;
    result.status = "OK";
    result.status_code = 200;
    result.remaining_notes = newNotes;
    console.log("New Note Content", output);
    console.log("Deleted Note ID", result);
    console.log("delete and update notes");
  } else {
    res.sendStatus(404);
    console.log("problem in DELETE noteRoute.js");
  }
  res.json(result);
});

module.exports = router;
