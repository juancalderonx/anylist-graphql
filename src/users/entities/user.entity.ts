import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  

  @Field( () => ID )
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field( () => String )
  @Column('text', { unique: true, })
  email: string;

  // @Field( () => String ) No es un field porque no queremos que se muestre en las queries/consultas.
  @Column('text', { select: false })
  password: string;

  @Field( () => String )
  @Column('text')
  fullname: string;

  @Field( () => String )
  @Column('text', { default: 'active' })
  status: string;

  @Field( () => [String] )
  @Column('text', { array: true, default: ['user'] })
  roles: string[];

  // TODO: Relations and Before and After...

}
