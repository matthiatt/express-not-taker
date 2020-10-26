var path = require("path");
// All done within the instructions provided by the README.md.
module.exports = function(noteApp){

  noteApp.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  noteApp.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};