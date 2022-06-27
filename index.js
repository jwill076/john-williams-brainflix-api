const express = require("express");
const app = express();
const API_PORT = 8080;
const cors = require("cors");
const Videos = require("./routes/videos");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use("/videos", Videos);

app.listen(API_PORT, (error) => {
  error ? console.error(error) : console.log(`I'm currently running on http://localhost:${API_PORT}`);
});