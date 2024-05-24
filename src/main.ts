import {NestFactory} from '@nestjs/core';
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

let cors = require('cors')

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cors())

  const config = new DocumentBuilder()
      .setTitle('Swagger dating')
      .setDescription("Документация по дейтинг плафторме")
      .setVersion('1.0.0')
      .addTag("farkuy")
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => {
    console.log(`Сервер запустился на ${PORT} порту`)
  })
}
start();
