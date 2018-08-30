import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Template } from '../entity/Template';

@Injectable()
export class TemplatesService {

  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: Repository<Template>,
  ) {}

  async findAll(): Promise<Template[]> {
    return await this.templateRepository.find();
  }

  async save(template): Promise<Template> {
    return await this.templateRepository.save(template);
  }

}
