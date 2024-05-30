import { Module } from '@nestjs/common';
import { AWSController } from './controllers/aws.controller';
import { AWSService } from './services/aws.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AWSController],
    providers: [AWSService],
})
export class AwsModule {

}
