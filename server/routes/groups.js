const express = require('express');
const router = express.Router();
const { groups } = require('../data');

// GET /groups - list all groups created by the current user
router.get('/', (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const userGroups = groups.filter(group => group.createdBy === userId);
  res.json(userGroups);
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
  const { name, members, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const newGroup = {
    id: Date.now().toString(),
    name,
    members,
    expenses: [],
    createdBy: userId
  };

  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// DELETE /groups/:id - delete a group
router.delete('/:id', (req, res) => {
  const groupId = req.params.id;
  const index = groups.findIndex(g => g.id === groupId);

  if (index === -1) {
    return res.status(404).json({ error: 'Group not found' });
  }

  groups.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
