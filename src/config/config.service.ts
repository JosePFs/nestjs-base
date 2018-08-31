import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
  [prop: string]: string;
}

@Injectable()
export class ConfigService {

  private readonly defaultEnv = 'development';

  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const configPath = filePath || `${__dirname}/../../${this.defaultEnv}.env`;
    const config = dotenv.parse(fs.readFileSync(configPath));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig | any {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid([this.defaultEnv, 'production', 'test'])
        .default(this.defaultEnv),
      PORT: Joi.number().default(3000),
      TIMEZONE: Joi.string().required(),
      PREFIX: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

}