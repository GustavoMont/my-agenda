import { Module } from '@nestjs/common';
import database from '@src/infra/database';

@Module({
  providers: [
    {
      provide: database.DB_CONTEXT_TOKEN,
      useFactory: database.createDatabase,
    },
  ],
  exports: [database.DB_CONTEXT_TOKEN],
})
export class DatabaseModule {}
