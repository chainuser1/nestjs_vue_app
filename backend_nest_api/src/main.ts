import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('NestJS with TypeORM')
    .setDescription('The NestJS with TypeORM API description')
    .setVersion('1.0').build(); 
  const app = await NestFactory.create(AppModule,{cors:true});
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  
}
bootstrap();
