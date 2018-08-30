import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
export class Base {

    @ObjectIdColumn()
    protected id: ObjectID;

    @Column({ length: 255 })
    @IsString()
    @IsNotEmpty()
    protected key: string;

    @Column({ length: 255 })
    @IsString()
    @IsNotEmpty()
    protected name: string;

}
