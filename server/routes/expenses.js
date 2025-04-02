const express = require('express');
const router = express.Router();
const { groups } = require('../data');

// POST /expenses - add expense to a group
router.post('/', (req, res) => {
  const { groupId, title, amount, paidBy, splitWith } = req.body;

  const group = groups.find(g => g.id === groupId);
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }

  const expense = {
    id: Date.now().toString(),
    title,
    amount,
    paidBy,
    splitWith
  };

  group.expenses.push(expense);
  res.status(201).json(expense);
});

module.exports = router;
