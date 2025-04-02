const express = require('express');
const router = express.Router();
const { groups } = require('../data');

// GET /groups - list all groups
router.get('/', (req, res) => {
  res.json(groups);
});

// GET /groups/:id - get a specific group by ID
router.get('/:id', (req, res) => {
  const groupId = req.params.id;
  const group = groups.find(g => g.id === groupId);

  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }

  res.json(group);
});
  
// POST /groups - create a new group
router.post('/', (req, res) => {
  const { name, members } = req.body;

  const newGroup = {
    id: Date.now().toString(), // simple ID
    name,
    members,
    expenses: []
  };

  groups.push(newGroup);
  res.status(201).json(newGroup);
});

module.exports = router;
