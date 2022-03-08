import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import getRandomInt from 'src/utils';
import { Repository } from 'typeorm';
import { CreateEdgeInput } from './dtos/create-edges.input';
import { UpdateEdgeInput } from './dtos/update-edges.input';
import { Edges } from './edges.entity';

@Injectable()
export class EdgesService {
  constructor(
    @InjectRepository(Edges)
    private readonly edgeRepository: Repository<Edges>,
  ) {}
  async create(createEdgeInput: CreateEdgeInput): Promise<Edges> {
    const capcity = getRandomInt(10000, 1000000);
    const edge = this.edgeRepository.create({
      capcity: capcity,
      ...createEdgeInput,
    });
    return await this.edgeRepository.save(edge);
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

  async update(id: number, UpdateEdgeInput: UpdateEdgeInput): Promise<Edges> {
    const edge = await this.edgeRepository.preload({
      id: id,
      ...UpdateEdgeInput,
    });
    if (!edge) {
      throw new NotFoundException(`Edge with  #${id} not found`);
    }
    return this.edgeRepository.save(edge);
  }

  async remove(id: number): Promise<boolean> {
    const edge = await this.findOne(id);
    await this.edgeRepository.remove(edge);
    return true;
  }
}
