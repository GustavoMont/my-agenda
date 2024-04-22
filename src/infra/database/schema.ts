import { bigserial, pgTable } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: bigserial('id', { mode: 'number' }).primaryKey().notNull(),
});
