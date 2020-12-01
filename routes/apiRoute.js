const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    var noteTaker = JSON.parse(data);

    app.get("/api/notes", function (req, res) {
      res.json(noteTaker);
    });

    app.post("/api/notes", function (req, res) {
      let createdNote = req.body;
      noteTaker.push(createdNote);
      updateDb();
      return console.log("Added new note: " + createdNote.title);
    });

    app.get("/api/notes/:id", function (req, res) {
      res.json(noteTaker[req.params.id]);
    });

    app.delete("/api/notes/:id", function (req, res) {
      noteTaker.splice(req.params.id, 1);
      updateDb();
      console.log("Deleted note with id " + req.params.id);
    });

    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    function updateDb() {
      fs.writeFile("db/db.json", JSON.stringify(notes, "\t"), (err) => {
        //Update the json file
        if (err) throw err;
        return true;
      });
    }
  });
};
