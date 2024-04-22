import { defineConfig } from 'drizzle-kit';
import { join } from 'path';

export default defineConfig({
  schema: join('src', 'infra', 'database', 'schema.ts'),
  driver: 'pg',
  out: join('src', 'infra', 'database', 'migrations'),
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});
