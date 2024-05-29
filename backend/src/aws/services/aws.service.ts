import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
    getSignedUrl,
  } from "@aws-sdk/s3-request-presigner";
import { SignedResponse } from '../dto/signed-url-response.dto';

@Injectable()
export class AWSService {

    constructor(private readonly configService: ConfigService) {
    }

    private s3 = new S3Client({
        region: this.configService.get<string>('REGION'),
        credentials: {
            accessKeyId: this.configService.get<string>('ACCESS_KEY'),
            secretAccessKey: this.configService.get<string>('SECRET_KEY'),
        },
    });

    getS3Instance(): S3Client {
        return this.s3;
    }

    async getS3SignedUrl(contentType: string): Promise<SignedResponse> {
        const ex = contentType.split("/")[1];
        const key = `${randomUUID()}.${ex}`;

        const putObjectCommand = new PutObjectCommand({
            Bucket: this.configService.get<string>('BUCKET_NAME'),
            Key: key,
            ContentType: contentType,
        });

        const url = await getSignedUrl(this.s3, putObjectCommand, { expiresIn: 60 });
        return { url, objectKey: key } as SignedResponse;
    }

}
