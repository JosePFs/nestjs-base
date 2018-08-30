import { Entity, Column } from 'typeorm';
import { ValidateNested, IsNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { Base } from './Base';
import { Component } from './Component';

@Entity()
export class Template extends Base {

    @Column(type => Component)
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Component)
    components: Component[];

}
