const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "static")));

// database
const db = require("./app/models");

// simple route
app.get("/api", (req, res) => {
  try {
    db.appointment.findAll({
       where: { doctorId: 1 },
       attributes : ["id","status"]
    })
      .then((appointments) => {
        res.json(appointments);
      })
  } catch (err) {
    return res.status(404).send({ message: err })
  }
});

// loading api routes
require("./app/routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});