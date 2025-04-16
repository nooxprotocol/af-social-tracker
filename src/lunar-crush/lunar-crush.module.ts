import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LunarCrushService } from './lunar-crush.service';
import { LunarCrushController } from './lunar-crush.controller';

@Module({
  imports: [HttpModule],
  providers: [LunarCrushService],
  controllers: [LunarCrushController],
})
export class LunarCrushModule {}
