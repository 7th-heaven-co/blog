import getTursoClient from "./client";

const client = getTursoClient();

const queries = [
  {
    sql: `
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_first_name TEXT,
        user_last_name TEXT,
        user_email TEXT,
        user_created_at TEXT,
        user_updated_at TEXT,
        user_flagged INTEGER
      );
    `,
  },
  {
    sql: `
      CREATE TABLE IF NOT EXISTS Newsletter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        news_email TEXT,
        news_heaven INTEGER,
        news_announcements INTEGER,
        news_community INTEGER,
        news_events INTEGER,
        news_author INTEGER,
        news_releases INTEGER,
        news_active INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      );
    `,
  },
];

async function setupDatabase() {
  try {
    await client.batch(queries);
    console.log("Database setup completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

setupDatabase();
