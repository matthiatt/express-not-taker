var path = require("path");
const router = require("express").Router();
// All done within the instructions provided by the README.md.

  router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

module.exports = router;