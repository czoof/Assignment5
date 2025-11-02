import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Open SQLite database
const dbPromise = open({
  filename: './recipes.db',
  driver: sqlite3.Database
});

// Get all recipes
app.get('/api/recipes', async (req, res) => {
  try {
    const db = await dbPromise;
    const rows = await db.all("SELECT * FROM recipes ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Get single recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const row = await db.get("SELECT * FROM recipes WHERE id = ?", [req.params.id]);
    if (!row) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.json(row);
  } catch (err) {
    console.error('Error fetching recipe:', err);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

// Create new recipe
app.post('/api/recipes', async (req, res) => {
  const { name, ingredients, instructions, cookTime } = req.body;
  if (!name || !ingredients || !instructions || !cookTime) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  try {
    const db = await dbPromise;
    const result = await db.run(
      "INSERT INTO recipes (name, ingredients, instructions, cookTime) VALUES (?, ?, ?, ?)",
      [name, ingredients, instructions, cookTime]
    );
    const newRecipe = await db.get("SELECT * FROM recipes WHERE id = ?", [result.lastID]);
    res.status(201).json(newRecipe);
  } catch (err) {
    console.error('Error creating recipe:', err);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// Delete recipe
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.run("DELETE FROM recipes WHERE id = ?", [req.params.id]);
    if (result.changes === 0) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    console.error('Error deleting recipe:', err);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Recipe API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;
