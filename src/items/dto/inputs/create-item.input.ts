import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength, IsIn, IsNumber, IsPositive, Min } from 'class-validator';

@InputType()
export class CreateItemInput {

  @Field( () => String, { description: 'Name of item' } )
  @IsNotEmpty() @IsString() @MinLength(1) @MaxLength(200)
  name: string;

  @Field( () => Float, { description: 'Quantity of item' } )
  @IsNotEmpty() @IsPositive() @IsNumber() @Min(1)
  quantity: number;

  @Field( () => String, { description: 'Quantity type of item' } )
  @IsNotEmpty() @IsIn(['kg', 'gr', 'units', 'litros', 'ml']) @IsString()
  quantityUnits: string;

}
