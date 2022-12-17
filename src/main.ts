import * as fs from 'fs'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { generateApi } from 'swagger-typescript-api'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      // https: {
      //   key: fs.readFileSync(path.join(__dirname, '../secrets/api.wozluohd.xyz.key')),
      //   cert: fs.readFileSync(path.join(__dirname, '../secrets/api.wozluohd.xyz_bundle.crt')),
      // },
    }),
  )

  app.enableShutdownHooks()

  const config = new DocumentBuilder().addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  })
  SwaggerModule.setup('api', app, document)

  // 将swagger文档转为JSON格式，并根据此为前端生成API client
  fs.writeFileSync('./swagger.json', JSON.stringify(document))
  generateApi({
    name: 'api-base.ts',
    output: process.env.FRONTEND_API_PATH,
    input: './swagger.json',
    unwrapResponseData: true,
    httpClientType: 'axios',
  })

  // 允许跨域
  app.enableCors()
  // 启用验证管道，从而使class validator生效
  app.useGlobalPipes(new ValidationPipe({ transform: true, skipMissingProperties: false }))

  await app.listen(4000, '0.0.0.0')
}
bootstrap()
