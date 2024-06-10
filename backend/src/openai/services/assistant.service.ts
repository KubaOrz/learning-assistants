import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AssistantService {

    constructor(private readonly configService: ConfigService) {
    }

    

}
