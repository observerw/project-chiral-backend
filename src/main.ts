import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { mkdir } from 'fs/promises'
import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'
import multipart from '@fastify/multipart'
import { AppModule } from './app.module'
import { filesPath, staticPath, tempFilePath } from './file/const/static'

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
  // FIXME 类型错误
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app as any)

  // 将prisma的异常转换为http异常
  // FIXME 类型错误
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter as any))

  // 为fastify添加文件上传支持
  app.register(multipart)
  await Promise.all([
    mkdir(filesPath, { recursive: true }),
    mkdir(tempFilePath, { recursive: true }),
  ])
  app.useStaticAssets({ prefix: '/static', root: staticPath })

  const addr = ENV === 'development' ? 'localhost' : '0.0.0.0'
  await app.listen(4000, addr)
}
bootstrap()
