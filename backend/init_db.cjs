const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./recipes.db', (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
    return;
  }

  console.log('✅ Connected to SQLite database.');

  db.run(
    `CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      cookTime TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    (err) => {
      if (err) {
        console.error('❌ Error creating table:', err.message);
      } else {
        console.log('✅ Table "recipes" created or already exists.');
      }

      db.close((err) => {
        if (err) {
          console.error('❌ Error closing database:', err.message);
        } else {
          console.log('✅ Database setup complete and connection closed.');
        }
      });
    }
  );
});
