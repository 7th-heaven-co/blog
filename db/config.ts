import { defineDb, defineTable, column } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true, onDelete: "cascade" }),
    user_first_name: column.text({ optional: true }),
    user_last_name: column.text({ optional: true }),
    user_email: column.text({ unique: true }),
    user_created_at: column.date(),
    user_updated_at: column.date(),
    user_flagged: column.boolean({ default: false }),
  },
});

const Newsletter = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    user_id: column.number({ references: () => Users.columns.id, onDelete: "cascade" }),
    news_email: column.text(),
    news_announcements: column.boolean({ default: false }),
    news_events: column.boolean({ default: false }),
    news_community_notes: column.boolean({ default: false }),
    news_updates: column.boolean({ default: false }),
    news_active: column.boolean({ default: true }),
  }
});

export default defineDb({
  tables: { Users, Newsletter },
});

