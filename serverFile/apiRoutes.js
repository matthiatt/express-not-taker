const fs = require("fs");

// Down below, I want to export the files here with a global scope of what I want it to encompass.  The reason being is becuase I want the contents within this file to obtain what I am linking.  In this case, I am linking the file 'db' and then linking the content within the file, which is named 'db.json'.
module.exports = function(app){
  let userNotes = require("./db/db.json");

// The application must get/require the content that was just created. Which, in this case it's the 'userNotes' since it's being returned on line 9.
  app.get("/apiRoutes/notes", (req, res) => {
    return res.json(userNotes);
  });
  
// First I created the const 'id' that should have reference variables for later down the line when coding this out.
  app.get("/apiRoutes/notes/:id", (req, res) => {
    // req.params.id(get) or req.params.id.get()?? 
    
    // Used params to express the URL aspect connected.
    const id = req.params.id;

    // Decided to declare 'foundData' so then I can declare a variable down the line, like on line 20.
    userNotes.forEach(foundnum => {
      if (id == foundNum.id){
        let foundData;
        foundData = foundNum;

        // Creating a return on the data which was found from 'foundData'.
        return res.json(foundNum);
      }
    });
    return res.json(false);
  });

// After the first step, I then went and created a 'post' method.
  app.post("/apiRoutes/notes", (req, res) => {

    // telling the constant variable 'recentNote' to save the data to the body when requested.
    // linked the element id to the constant 'recentNote'. This is becuase I want to set the boundries up to the id numbers and the correlation to the note.
    // **Note** I was reading that the module - "body-parser" was needed within 2020 since express doesn't cary that package anymore. I downloaded it in my files. URL is in the resources. I am testing first without, and then to see if I really need it or not.
    // Tutor I pay for helped me on this portion (lines 39 - 66).
    const recentNote = req.body;
    if 
      (userNotes.length === 0){
      recentNote.id = 1;
    } else {
      recentNote.id = (userNotes[userNotes.length-1].id + 1);
      }
    // Pushing data into the array.
    userNotes.push(recentNote);

    // Stringify the JSON file so it can be read as a string.
    let jsonPathNote = JSON.stringify(userNotes);

    // Since the JSON file is a string, the data can now be written by using a 'file system' call by doing 'fs'. I then call the math of where I want the file written to, and then call the let function, which is 'jsonPathNote'.
    fs.writeFile("./db/db.json", "utf8", jsonPathNote, function(err) {
      if 
      (err) {
        return console.log(err);
      }
    //   console.log("Hey, you did it!");
    });
    // Telling to give response when true.
    res.json(true);
  });
    };

    // Looked back on homework and talked to some classmates. Decided to put in a basic for loop when the data is read.
    fs.readFile("./db/db.json", "utf8", jsonPathNote, function (err, data) {
      if (err) throw err;

      // Calling the string callback here
      const jsonPathNote=JSON.parse(data);
      for (i = 0; i < jsonPathNote.length; i++) {
        if (jsonPathNote[i].id == req.params.id) {
          jsonPathNote.splice(i, 1);
          break;
          //   console.log("Hey, read it!");
        }}});


// Now I need to add a sort of way to delete and id.
// Got some help from tutor on lines 89 - 95.
  app.delete("/apiRoutes/notes/:id", (req, res) => {
    const id = req.params.id;
    userNotes.forEach((foundNum, index) => {
      if(id == foundNum.id){
        let foundData;
        foundData = foundNum;

        // I need to add new elements while removing old elements when making changes to my array. I need to do this so I can get the saved userNotes under the saved id, which has a unique ID. So, I added a splice method first after declating 'foundData'.
        userNotes.splice(index,1);

        // I want to create a section of a string and returns a new string from that splice method that was just called right above.
        const userNotesCopy = userNotes.slice();

        // I then needed to make this into a string so I called the stringify function here.
        let jsonPathNote = JSON.stringify(userNotesCopy);

        // Then last, I repeat what I did before with the previous fs 'writeFile', by writing the file in txt with 'utf8', then calling the data with 'jsonPathNote'.  I am writing a 'writeFile' becuase I want to save the last deleted data.
        fs.writeFile("./db/db.json", "utf8", jsonPathNote, function(err) {
          if (err) {
            return console.log(err);
          }
        //   console.log("Hey, you did it again!");
        });

      }
    });
    // Telling to give response when true.
    res.json(true);
  });