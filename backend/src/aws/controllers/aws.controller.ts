import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UseGuards,
    HttpCode,
    Get,
    Query,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { AWSService } from '../services/aws.service';
import { SignedResponse } from '../dto/signed-url-response.dto';
  
  @Controller('aws')
  @ApiTags('AWS')
  export class AWSController {
    constructor(private readonly AWSService: AWSService) {}
  
    @Get('/getSignedUrl')
    async register(
      @Query('contentType') contentType: string,
    ): Promise<SignedResponse> {
      return await this.AWSService.getS3SignedUrl(contentType);
    }

  }
  