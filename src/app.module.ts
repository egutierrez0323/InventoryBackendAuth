import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import config from './config';
import { UserEntity } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.db_engine,
      host: config.db_server,
      port: config.db_port,
      username: config.db_user,
      password: config.db_pass,
      database: config.db_name,
      synchronize: true,
      entities: [UserEntity],
      logging: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
