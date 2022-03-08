import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { EdgesResolver } from './edges.resolver';

@Module({
  controllers: [],
  providers: [EdgesService, EdgesResolver],
})
export class EdgesModule {}
