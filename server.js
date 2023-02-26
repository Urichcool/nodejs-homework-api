const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const morgan = require("morgan");
require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const{connectMongo} = require('./db/conection')

const router = require("./routes/api/contactsRouter");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan(formatsLogger));

app.use("/api/contacts", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const start = async () => {
    try {
        await connectMongo();
        console.log("Database connection successful");
        app.listen(PORT, (err) => {
            if (err) console.error("Error at aserver launch", err);
            console.log(`Server works at port ${PORT}`);
        });
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
};

start();
