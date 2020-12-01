const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.post("/api/notes", function (req, res) {
    let createdNote = req.body;
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      var noteTaker = JSON.parse(data);
      noteTaker.push(createdNote);
      updateDb(noteTaker);
      return console.log("Added new note: " + createdNote.title);
    });
    function updateDb(noteTaker) {
      fs.writeFile("db/db.json", JSON.stringify(noteTaker, "\t"), (err) => {
        //Update the json file
        if (err) throw err;
        return true;
      });
    }
  });

  app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      var noteTaker = JSON.parse(data);
      res.json(noteTaker);
    });
  });
  app.get("/api/notes/:id", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      var noteTaker = JSON.parse(data);
      res.json(noteTaker);
    });
    // res.json(noteTaker[req.params.id]);
  });
  app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      var noteTaker = JSON.parse(data);
      res.json(noteTaker);
    });
    // noteTaker.splice(req.params.id, 1);
    updateDb();
    console.log("Deleted note with id " + req.params.id);
  });

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
