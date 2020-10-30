// Copy and pasted from previous examples when looking back at the unit homework.
// Don't recall if the 'app.listen' goes before or after the 'app.use' portion.
// **NOTE** if changes need to be made on this end I will do so after testing.
var http = require('http');
const express = require("express");
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");

const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use("/", apiRoutes);
app.use("/", htmlRoutes);


function handleRequest(req, res) {
  res.end("It Works!!" + req.url);
}

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));