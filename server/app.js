const express = require('express');
const cors = require('cors');
const groupRoutes = require('./routes/groups');
const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/groups', groupRoutes); // Mount /groups
app.use('/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
