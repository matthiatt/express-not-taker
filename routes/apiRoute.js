const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.post("/api/notes", function (req, res) {
    let createdNote = req.body;
    createdNote.id = uuidv4();
    // console.log("uuid", uuidv4());
    console.log(createdNote);
    fs.readFile("db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      var noteTaker = JSON.parse(data);
      noteTaker.push(createdNote);
      updateDb(noteTaker);
      res.redirect("/notes");
      return console.log("Added new note: " + createdNote.title);
    });
    function updateDb(noteTaker) {
      fs.writeFile("db/db.json", JSON.stringify(noteTaker, "\t"), (err) => {
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
  });
  // app.delete("/api/notes/:id", function (req, res) {
  //   console.log(req.params);
  //   fs.readFile("db/db.json", "utf8", (err, data) => {
  //     if (err) throw err;
  //     var noteTaker = JSON.parse(data);
  //     res.json(noteTaker);
  //     noteTaker.splice(req.params.id);
  //     if (!req.params.id) {
  //       return res.status(400).json({
  //         status: "error",
  //         error: "req body cannot be empty",
  //       });
  //       // If there is an Id, then remove that item from the Json file.
  //     }
  //   });
  //   // noteTaker(req.params.id);
  //   // updateDb();
  //   console.log("Deleted note with id " + req.params.id);
  // });
  app.delete("/api/notes/:id", function (req, res) {
    var deleteNote = req.params.id;

    fs.readFile("db/db.json", "utf8", function (err, data) {
      if (err) throw err;

      var note = JSON.parse(data);
      var index = parseInt(deleteNote) - 1;
      note.splice(index, 1);

      fs.writeFile("db/db.json", JSON.stringify(note), "utf8", function (err) {
        if (err) throw err;
      });
    });
    res.send(deleteNote);
  });

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
