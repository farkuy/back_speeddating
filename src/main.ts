import {NestFactory} from '@nestjs/core';
import {AppModule} from "./app.module";

let cors = require('cors')

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cors())

  await app.listen(PORT, () => {
    console.log(`Сервер запустился на ${PORT} порту`)
  })
}
start();
