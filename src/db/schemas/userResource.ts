import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { users } from "./auth";

export const userResource = pgTable("userResource", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

const updateInsertSchema = createInsertSchema(userResource, {
  userId: z.string(),
  name: z.string().min(8).max(255),
  updatedAt: z.date().default(() => new Date()),
});

export const insertUserResourceSchema = updateInsertSchema.pick({
  name: true,
});

export const updateUserResourceSchema = updateInsertSchema
  .pick({
    id: true,
    name: true,
  })
  .required();

export const deleteUserResourceSchema = updateUserResourceSchema
  .pick({
    id: true,
  })
  .required();

export const userResourceSchema = createSelectSchema(userResource);

export type UserResource = z.infer<typeof userResourceSchema>;
