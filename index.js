const express = require('express');
const Joi = require('joi');
// const debug = require('debug');
// import debug from 'debug';
const app = express();
app.use(express.json());

const friends = [
  { id: 1, name: 'Yemi' },
  { id: 2, name: 'Tomi' },
  { id: 3, name: 'Fayipe' },
  { id: 4, name: 'Akisoft' },
];

function validateFriend(friend) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(friend, schema);
}

app.get('/', (req, res) => res.send('Yaay!! Welcome to FriendsZone'));

app.get('/api/friends', (req, res) => res.send(friends));

app.post('/api/friends', (req, res) => {
  const { error } = validateFriend(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);
  const friend = {
    id: friends.length + 1,
    name: req.body.name,
  };
  friends.push(friend);
  return res.send(friend);
});

app.get('/api/friends/:id', (req, res) => {
  const friend = friends.find(myfriend => myfriend.id === Number(req.params.id));
  if (!friend) return res.status(404).send('No Friend found with the given ID');
  return res.send(friend);
});

app.put('/api/friends/:id', (req, res) => {
  const friend = friends.find(myfriend => myfriend.id === Number(req.params.id));
  if (!friend) return res.status(404).send('No Friend found with the given ID');

  const { error } = validateFriend(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);
  friend.name = req.body.name;
  return res.send(friend);
});

app.delete('/api/friends/:id', (req, res) => {
  const friend = friends.find(myfriend => myfriend.id === Number(req.params.id));
  if (!friend) return res.status(404).send('No Friend found with the given ID');

  const index = friends.indexOf(friend);
  friends.splice(index, 1);

  return res.send(friend);
});

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
