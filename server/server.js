const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

//middleware

//use cors to allow cross origin resource sharing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/authentication", require("./routes/jwtAuth"));
app.use("/ticket", require("./routes/ticket"));

app.listen(5000, () => {
  console.log(`Server is starting on port 5000`);
});
