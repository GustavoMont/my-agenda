import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { join } from 'path';
import { migrate as migrationsRunner } from 'drizzle-orm/postgres-js/migrator';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: join('.env.development'),
  expandVariables: true,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

function createDatabase() {
  const db = drizzle(pool, { schema });
  return db;
}

async function runMigrations() {
  const db = createDatabase();
  await migrationsRunner(db, {
    migrationsFolder: join('src', 'infra', 'database', 'migrations'),
  });
}

async function endConnection() {
  await pool.end();
}

export default {
  DB_CONTEXT_TOKEN: 'DB_CONTEXT',
  createDatabase,
  runMigrations,
  endConnection,
};
