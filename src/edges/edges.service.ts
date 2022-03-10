import {
  Inject,
  Injectable,
  Module,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import getRandomInt from 'src/utils';
import { Repository } from 'typeorm';
import { CreateEdgeInput } from './dtos/create-edges.input';
import { UpdateEdgeInput } from './dtos/update-edges.input';
import { Edges } from './edges.entity';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessage, Channel } from 'amqplib';


@Injectable()
export class EdgesService {
  private logger: Logger;
  constructor(
    @InjectRepository(Edges)
    private readonly edgeRepository: Repository<Edges>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async create(createEdgeInput: CreateEdgeInput): Promise<any> {
    const capacity = getRandomInt(10000, 1000000);
    const edge = this.edgeRepository.create({
      capcity: capacity,
      ...createEdgeInput,
    });
    const data = await this.edgeRepository.save(edge);
    this.amqpConnection.publish('edges-exchange', 'edges-route', {
      route: 'add-edges',
      data,
    });
  }

  async findAll(): Promise<Array<Edges>> {
    return await this.edgeRepository.find();
  }

  async findOne(id: number): Promise<Edges> {
    const edge = await this.edgeRepository.findOne(id);
    if (!edge) {
      throw new NotFoundException(`Edge #${id} not found`);
    }
    return edge;
  }

  async update(id: number, UpdateEdgeInput: UpdateEdgeInput): Promise<void> {
    const edge = await this.edgeRepository.preload({
      id: id,
      ...UpdateEdgeInput,
    });
    if (!edge) {
      throw new NotFoundException(`Edge with  #${id} not found`);
    }
    const data = await this.edgeRepository.save(edge);
    this.amqpConnection.publish('edges-exchange', 'edges-route', {
      route: 'update-edges',
      data,
    });
  }

  async remove(id: number): Promise<boolean> {
    const edge = await this.findOne(id);
    await this.edgeRepository.remove(edge);
    return true;
  }

}
