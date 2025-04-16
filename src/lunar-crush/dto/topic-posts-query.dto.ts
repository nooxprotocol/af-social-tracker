import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class TopicPostsQueryDto {
  @ApiProperty({
    description: '시작 시간 (Unix timestamp, 초 단위)',
    required: false,
    example: 1612137600,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  start?: number;

  @ApiProperty({
    description: '종료 시간 (Unix timestamp, 초 단위)',
    required: false,
    example: 1612224000,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  end?: number;
}
