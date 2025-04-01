import { integer, text, pgTable, uuid, varchar, pgEnum, date, timestamp } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", ['pending', 'approved', 'rejected']);
export const ROLE_ENUM = pgEnum("role", ['admin', 'user']);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", ['borrow', 'returned']);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", {length: 255}).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM('status').default('pending'),
  role: ROLE_ENUM('role').default('user'),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const books = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", {length: 255}).notNull(),
  author: varchar("author", {length: 255}).notNull(),
  genre: text("genre").notNull(),
  rating: integer("rating").notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  description: text("description").notNull(),
  coverColor: varchar("cover_color", {length:7}).notNull(),
  coverUrl: text("cover_url").notNull(),
  videoUrl: text("video").notNull(),
  summary: varchar("summary").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
