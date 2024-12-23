import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: String(process.env.DATABASE_HOST),
      port: Number(process.env.DATABASE_PORT),
      username: String(process.env.DATABASE_USER), // Database user
      password: String(process.env.DATABASE_PASSWORD), // Database password
      database: String(process.env.DATABASE_NAME), // Database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Be cautious with this in production
    }),
    TaskModule,
    AuthModule,
  ],
})
export class AppModule {}
