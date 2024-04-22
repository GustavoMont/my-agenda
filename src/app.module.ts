import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      expandVariables: true,
      isGlobal: true,
    }),
    {
      module: DatabaseModule,
      global: true,
    },
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
