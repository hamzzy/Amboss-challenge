import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateEdgeInput {
  @Field()
  node1_alias: string;

  @Field({ nullable: false })
  node2_alias: string;
}