import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEdgeInput } from './dtos/create-edges.input';
import { UpdateEdgeInput } from './dtos/update-edges.input';
import { Edges } from './edges.entity';
import { EdgesService } from './edges.service';

@Resolver(() => Edges)
export class EdgesResolver {

  constructor(private readonly edgeService: EdgesService) {}

  @Mutation(() => Edges)
  createEdge(@Args('createEdgeInput') createEdgeInput: CreateEdgeInput) {
    return this.edgeService.create(createEdgeInput);
  }

  @Query(() => [Edges], { name: 'edges' })
  getEdges() {
    return this.edgeService.findAll();
  }

  @Query(() => Edges, { name: 'edge' })
  getEdge(@Args('id', { type: () => Int }) userId: number) {
    return this.edgeService.findOne(userId);
  }

  @Mutation(() => Edges)
  updateEdge(@Args('updateEdgeInput') updateEdgeInput: UpdateEdgeInput) {
    return this.edgeService.update(updateEdgeInput.id, updateEdgeInput);
  }

  @Mutation(() => Edges)
  removeEdge(@Args('id', { type: () => Int }) id: number) {
    this.edgeService.remove(id);
    return true;
  }
}
