import { Module } from '@nestjs/common';
import { PreferredTypeService } from './preferred_type.service';
import { PreferredTypeController } from './preferred_type.controller';

@Module({
  providers: [PreferredTypeService],
  controllers: [PreferredTypeController]
})
export class PreferredTypeModule {}
