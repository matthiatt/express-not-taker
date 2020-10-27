// Copy and pasted from previous examples when looking back at the unit homework.
// Don't recall if the 'app.listen' goes before or after the 'app.use' portion.
// **NOTE** if changes need to be made on this end I will do so after testing.

const express = require("express");
var PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`);
});