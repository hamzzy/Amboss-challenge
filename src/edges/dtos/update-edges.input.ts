import { CreateEdgeInput } from './create-edges.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdateEdgeInput extends PartialType(CreateEdgeInput) {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
