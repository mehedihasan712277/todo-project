import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const todos = pgTable("todos", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    completed: boolean("completed").notNull().default(false),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
