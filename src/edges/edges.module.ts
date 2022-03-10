import { Module } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { EdgesResolver } from './edges.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edges } from './edges.entity';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forFeature([Edges]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'edges-exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  providers: [EdgesService, EdgesResolver],
})
export class EdgesModule {}
