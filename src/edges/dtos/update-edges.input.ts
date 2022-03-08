import { CreateEdgeInput } from './create-edges.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateEdgeInput extends PartialType(CreateEdgeInput) {
  @Field(() => Int)
  id: number;
}