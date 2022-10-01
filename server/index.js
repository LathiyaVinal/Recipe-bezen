const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const recipeRoute = require("./routes/recipe")
const app = express();

const cors = require("cors");
dotenv.config();

mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connection successfull"))
    .catch((err) => console.log("Error found" + err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/recipe", recipeRoute);

app.get("/", (req, res)=>{
    res.send("Server started to deply");
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});