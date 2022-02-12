import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import mongoose from "mongoose";

import articleRouter from "./router/api/article/article.js";

const app = express();

const __fileName = fileURLToPath(
    import.meta.url);
const __dirName = path.dirname(__fileName);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/api/article", articleRouter);

main();
async function main() {
    await mongoose.connect("mongodb://localhost:27017/wikiDB");
}

app.get("/", (req, res) => {
    res.send("Success");
});

app.listen("3000", () => {
    console.log("Server app listen on port 3000");
});