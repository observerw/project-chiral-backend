import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      https: {
        key: readFileSync(path.join(__dirname, '../secrets/api.wozluohd.xyz.key')),
        cert: readFileSync(path.join(__dirname, '../secrets/api.wozluohd.xyz_bundle.crt')),
      },
    }),
  )

  app.enableShutdownHooks()

  const config = new DocumentBuilder().addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  })
  SwaggerModule.setup('api', app, document)
  writeFileSync('./swagger.json', JSON.stringify(document))

  // 允许跨域
  app.enableCors()
  // 启用验证管道，从而使class validator生效
  app.useGlobalPipes(new ValidationPipe({ transform: true, skipMissingProperties: false }))

  await app.listen(4000, '0.0.0.0')
}
bootstrap()
