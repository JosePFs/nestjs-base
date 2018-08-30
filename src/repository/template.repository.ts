import { EntityRepository, Repository } from 'typeorm';

import { Template } from '../entity/Template';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {}