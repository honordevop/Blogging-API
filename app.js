const connectToDB = require("./db");
require("dotenv").config();
const app = require("./index");
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

//connectToDB
connectToDB(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
