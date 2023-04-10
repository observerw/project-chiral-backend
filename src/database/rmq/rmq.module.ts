import { AmqpConnection, RabbitMQModule } from '@nestjs-plus/rabbitmq'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: process.env.RMQ_URI as string,
      defaultRpcTimeout: 50000,
      defaultExchangeType: '',
    }),
  ],
  providers: [AmqpConnection],
  exports: [AmqpConnection],
})
export class RmqModule {}
