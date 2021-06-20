const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/sideEffects", require("./routes/sideEffects"));
app.use("/chemotherapies", require("./routes/chemotherapies"));
app.use("/methodsOfPrevention", require("./routes/methodsOfPrevention"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
