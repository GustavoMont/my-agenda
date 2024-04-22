import {
  bigserial,
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: bigserial('id', { mode: 'number' }).primaryKey().notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  hasDone: boolean('has_done'),
  datetime: timestamp('datetime', {
    withTimezone: false,
    mode: 'string',
  }).notNull(),
  finishedAt: timestamp('finished_at', {
    withTimezone: false,
    mode: 'string',
  }),
  createdAt: timestamp('created_at', {
    withTimezone: false,
    mode: 'string',
  }).defaultNow(),
  updatedAt: timestamp('updated_at', {
    withTimezone: false,
    mode: 'string',
  }).defaultNow(),
});
