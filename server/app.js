const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Enable JSON parsing

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
