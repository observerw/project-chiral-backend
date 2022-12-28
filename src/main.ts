import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'
import { AppModule } from './app.module'

async function bootstrap() {
  const ENV = process.env.NODE_ENV

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      https: ENV === 'production'
        ? {
            key: readFileSync(path.join(__dirname, '../secrets/api.wozluohd.xyz.key')),
            cert: readFileSync(path.join(__dirname, '../secrets/api.wozluohd.xyz_bundle.crt')),
          }
        : undefined,
    }),
  )

  app.enableShutdownHooks()

  const config = new DocumentBuilder().addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  })
  SwaggerModule.setup('api', app, document)
  // 将Swagger配置写为静态文件，通过/api-docs获取，从而更新前端API
  writeFileSync('./swagger.json', JSON.stringify(document))

  // 允许跨域
  app.enableCors()
  // 启用验证管道，从而使class validator生效
  app.useGlobalPipes(new ValidationPipe({ transform: true, skipMissingProperties: false }))

  // prisma的生命周期和nest好像有点冲突，所以需要手动关闭
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  // 将prisma的异常转换为http异常
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const addr = ENV === 'development' ? 'localhost' : '0.0.0.0'
  await app.listen(4000, addr)
}
bootstrap()
