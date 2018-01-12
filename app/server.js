// Import express server
var express = require("express");

// Import body parser
var bodyParser = require("body-parser");

// Create express server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 9001;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

// Listen for client requests
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});