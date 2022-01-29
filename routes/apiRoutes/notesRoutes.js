const router = require("express").Router();
const { findById, createNewnote, validatenote } = require("../../lib/notes");
const notes = require("../../db/notes.json");
console.log(notes);

router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post("/notes", (req, res) => {
  req.body.id = notes.length.toString();

  if (!validatenote(req.body)) {
    res.status(400).send("The note is not properly formatted.");
  } else {
    const note = createNewnote(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
