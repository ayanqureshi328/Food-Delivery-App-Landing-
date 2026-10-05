const path = require("node:path");
const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE || "bytebite";
let feedbackCollectionPromise;

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/feedback", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (
    typeof name !== "string" || name.trim().length < 1 || name.trim().length > 80 ||
    typeof email !== "string" || email.trim().length > 254 ||
    typeof message !== "string" || message.trim().length < 5 || message.trim().length > 2000
  ) {
    return res.status(400).json({ error: "Please provide a name, valid email, and feedback of at least 5 characters." });
  }
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (!mongoUri) {
    return res.status(503).json({ error: "Feedback storage is not configured yet. Please try again later." });
  }

  try {
    feedbackCollectionPromise ||= (async () => {
      const client = new MongoClient(mongoUri);
      await client.connect();
      return client.db(databaseName).collection("feedback");
    })();
    const collection = await feedbackCollectionPromise;
    await collection.insertOne({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date()
    });
    return res.status(201).json({ message: "Thanks for helping us make ByteBite better!" });
  } catch {
    feedbackCollectionPromise = undefined;
    return res.status(503).json({ error: "We couldn't save your feedback right now. Please try again shortly." });
  }
});

app.listen(port, () => {
  console.log(`ByteBite is running at http://localhost:${port}`);
});