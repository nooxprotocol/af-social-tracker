import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TimeSeriesQueryDto {
  @ApiProperty({
    description: '시간 간격 (예: hour, day)',
    required: false,
    example: 'day',
  })
  @IsOptional()
  @IsString()
  bucket?: string;
}
