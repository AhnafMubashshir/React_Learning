/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
declare const module: any;

async function bootstrap() {
  const expressApp = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.enableCors();
  await app.listen(5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
