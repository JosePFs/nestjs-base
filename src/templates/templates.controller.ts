import { Controller, Get, Post, Body, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';

import { Template } from './../entity/Template';
import { TemplatesService } from './templates.service';

@Controller('templates')
export class TemplatesController {

    constructor(private readonly templatesService: TemplatesService) {}

    @Get()
    findAll(): Promise<Template[]> {
        return this.templatesService.findAll();
    }

    @Post()
    create(@Body(new ValidationPipe()) template: Template) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        return this.templatesService.save(template);
    }

}
