// uli-api/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/check-uli", (req, res) => {
  const { borrowerAddress } = req.body;
  // Simulate ULI check (replace with actual logic)
  const uliResult = Math.random() > 0.5; // Simulate approval/rejection

  res.json({ approved: uliResult });
});

app.listen(port, () => {
  console.log(`ULI API listening at http://localhost:${port}`);
});
