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
    splitWith,
    paidStatus: {} // ✅ new field
  };
  
  splitWith.forEach(person => {
    if (person !== paidBy) {
      expense.paidStatus[person] = false;
    }
  });
  
  group.expenses.push(expense);
  res.status(201).json(expense);
});

// DELETE /expenses/:id
router.delete('/:id', (req, res) => {
  const expenseId = req.params.id;

  // Loop through each group
  for (const group of groups) {
    const index = group.expenses.findIndex((e) => e.id === expenseId);
    if (index !== -1) {
      group.expenses.splice(index, 1);
      return res.status(204).send();
    }
  }

  return res.status(404).json({ error: 'Expense not found' });
});

// PATCH /expenses/:id/paid
router.patch('/:id/paid', (req, res) => {
  const { expenseId, groupId, person } = req.body;

  const group = groups.find(g => g.id === groupId);
  if (!group) return res.status(404).json({ error: 'Group not found' });

  const expense = group.expenses.find(e => e.id === expenseId);
  if (!expense) return res.status(404).json({ error: 'Expense not found' });

  if (!expense.paidStatus) expense.paidStatus = {};
  expense.paidStatus[person] = !expense.paidStatus[person];

  res.json({ success: true, paidStatus: expense.paidStatus });
});



module.exports = router;
