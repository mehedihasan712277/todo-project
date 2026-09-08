import { pgTable, uuid, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(), // hashed — hashing lib TBD when we build auth
    role: roleEnum("role").notNull().default("user"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
