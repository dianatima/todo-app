
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/api/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  res.json(result.rows);
});

app.post('/api/todos', async (req, res) => {
  const { task } = req.body;
  const result = await pool.query('INSERT INTO todos (task) VALUES ($1) RETURNING *', [task]);
  res.json(result.rows[0]);
});

app.delete('/api/todos/:id', async (req, res) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
  res.sendStatus(204);
});

app.use(express.static('public'));

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running');
});
