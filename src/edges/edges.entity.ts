import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Edges {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('int')
  capcity: number;

  @Field()
  @Column('text')
  node1_alias: string;

  @Field()
  @Column('text')
  node2_alias: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
