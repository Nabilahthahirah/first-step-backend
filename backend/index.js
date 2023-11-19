const express = require("express");
require('dotenv').config();
const app = express();
const route = require("./routes");
const port = process.env.PORT;

app.use("/", route);

app.listen(port, () => {console.log(`Server Running On Port: ${port}`)});

