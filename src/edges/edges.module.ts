import { Module } from '@nestjs/common';
import { EdgesController } from './edges.controller';
import { EdgesService } from './edges.service';
import { EdgesResolver } from './edges.resolver';

@Module({
  controllers: [EdgesController],
  providers: [EdgesService, EdgesResolver],
})
export class EdgesModule {}
