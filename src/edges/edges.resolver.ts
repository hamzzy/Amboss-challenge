import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { NotFoundException } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateEdgeInput } from './dtos/create-edges.input';
import { UpdateEdgeInput } from './dtos/update-edges.input';
import { Edges } from './edges.entity';
import { EdgesService } from './edges.service';
import { ConsumeMessage, Channel } from 'amqplib';
import { RabbitmqMessage } from './interface/rabbitMq.interface';

@Resolver(() => Edges)
export class EdgesResolver {
  constructor(private readonly edgeService: EdgesService) {}
  public get_edge_data: Edges[];
  public update_edge_data: Edges;

  @RabbitSubscribe({
    exchange: 'edges-exchange',
    routingKey: 'edges-route',
    queue: 'edge-queue',
    errorHandler: (channel: Channel, msg: ConsumeMessage, error: Error) => {
      console.log(error);
      channel.reject(msg, false); // use error handler, or otherwise app will crush in not intended way
    },
  })
  async onQueueConsumption(msg: RabbitmqMessage) {
    if (msg.route === 'add-edges') {
      const data = await JSON.parse(JSON.stringify(msg.data));
      this.get_edge_data = data;
      console.log(
        `New channel between ${data.node1_alias} and ${data.node2_alias} with a capacity of ${data.capcity} has been created`,
      );
    } else if (msg.route === 'update-edges') {
      const data = JSON.parse(JSON.stringify(msg.data));
      this.update_edge_data = data;
      console.log(
        `Update channel between ${data.node1_alias}-updated and ${data.node2_alias}-updated.`,
      );
    }
  }

  @Mutation(() => Edges)
  async createEdge(
    @Args('createEdgeInput') createEdgeInput: CreateEdgeInput,
  ): Promise<Edges[]> {
    await this.edgeService.create(createEdgeInput);
    return this.get_edge_data;
  }

  @Query(() => [Edges], { name: 'getEdges' })
  async getEdges() {
    return await this.edgeService.findAll();
  }

  @Query(() => Edges, { name: 'getEdge' })
  async getEdge(@Args('id', { type: () => Int }) id: number): Promise<Edges> {
    const edge_result = await this.edgeService.findOne(id);
    if (!edge_result) {
      throw new NotFoundException(id);
    }
    return edge_result;
  }

  @Mutation(() => Edges)
  async updateEdge(@Args('updateEdgeInput') updateEdgeInput: UpdateEdgeInput) {
    await this.edgeService.update(updateEdgeInput.id, updateEdgeInput);
    return this.update_edge_data;
  }

  @Mutation(() => Edges)
  async removeEdge(@Args('id', { type: () => Int }) id: number) {
    return await this.edgeService.remove(id);
  }
}
