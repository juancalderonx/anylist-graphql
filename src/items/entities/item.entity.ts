import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  
  @Field( () => ID )
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field( () => String )
  @Column()
  name: string;

  @Field( () => Float )
  @Column('float')
  quantity: number;

  @Field( () => String )
  @Column()
  quantityUnits: string;

  @Field( () => String )
  @Column()
  status: string;

}
