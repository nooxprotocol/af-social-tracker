import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// 개별 검색 조건을 위한 DTO
export class SearchTermDto {
  @ApiProperty({
    description: '검색할 키워드',
    example: 'btc',
  })
  @IsString()
  term: string;

  @ApiProperty({
    description: '검색 결과에 반드시 포함되어야 할 키워드 목록',
    required: false,
    example: ['bitcoin'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includes?: string[];

  @ApiProperty({
    description: '검색 결과에서 제외할 키워드 목록',
    required: false,
    example: ['solana'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excludes?: string[];
}

// 검색 설정을 위한 DTO
export class SearchJsonDto {
  @ApiProperty({
    description: '검색 조건 목록',
    type: [SearchTermDto],
  })
  @ValidateNested({ each: true })
  @Type(() => SearchTermDto)
  terms: SearchTermDto[];
}

export class SearchJsonSwaggerInputDto {
  @ApiProperty({
    description: '',
    type: () => SearchJsonDto,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SearchJsonDto)
  search_json: SearchJsonDto;
}
