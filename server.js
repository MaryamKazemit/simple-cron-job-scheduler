const express = require("express");
const dotEnv = require("dotenv");
const port = process.env.PORT || 5001;
// require("./scheduler1");
// require("./scheduler2");
require("./scheduler3");

const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
