const express = require("express");
const generateRoute = require("./routes/generateRoute");
const solveRoute = require("./routes/solveRoute");
const uniqueRoute = require("./routes/uniqueRoute");
const cors = require('cors');

const app = express();
const port = 4000;

app.use(express.json());
app.use(
    cors({
      origin: ["https://sudoku-play-and-solve.vercel.app"],
      credentials: true,
    })
  );

app.use("/api", generateRoute);
app.use("/api", solveRoute);
app.use("/api", uniqueRoute);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
