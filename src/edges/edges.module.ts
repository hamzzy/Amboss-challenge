import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { EdgesResolver } from './edges.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edges } from './edges.entity';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([Edges])],
  providers: [EdgesService, EdgesResolver],
})
export class EdgesModule {}
