import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserService } from './user/services/user.service';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { AwsModule } from './aws/aws.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        lazy: true,
      }),
      inject: [ConfigService],
    }),
    CourseModule,
    AwsModule,
    OpenaiModule,
  ],
})
export class AppModule {}
