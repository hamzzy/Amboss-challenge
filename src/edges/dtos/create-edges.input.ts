import { Field, InputType } from '@nestjs/graphql';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEdgeInput {
  @Field({ nullable: false })
  @IsString()
  @IsNotEmpty()
  node1_alias?: string;

  @Field({ nullable: false })
  @IsString()
  @IsNotEmpty()
  node2_alias?: string;
}
