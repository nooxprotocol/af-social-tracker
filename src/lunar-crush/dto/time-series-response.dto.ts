import { ApiProperty } from '@nestjs/swagger';

export class TimeSeriesDataDto {
  @ApiProperty({
    description: '시간 (Unix timestamp)',
    example: 1577836800,
  })
  time: number;

  @ApiProperty({
    description: '활성 기여자 수',
    example: 645,
    required: false,
  })
  contributors_active?: number;

  @ApiProperty({
    description: '새로 생성된 기여자 수',
    example: 395,
    required: false,
  })
  contributors_created?: number;

  @ApiProperty({
    description: '상호작용 수',
    example: 521961,
    required: false,
  })
  interactions?: number;

  @ApiProperty({
    description: '활성 게시물 수',
    example: 1115,
    required: false,
  })
  posts_active?: number;

  @ApiProperty({
    description: '새로 생성된 게시물 수',
    example: 825,
    required: false,
  })
  posts_created?: number;

  @ApiProperty({
    description: '감성 점수',
    example: 30,
    required: false,
  })
  sentiment?: number;

  @ApiProperty({
    description: '스팸 수',
    example: 140,
    required: false,
  })
  spam?: number;

  @ApiProperty({
    description: 'Alt 순위',
    example: 33,
    required: false,
  })
  alt_rank?: number;

  @ApiProperty({
    description: '종가',
    example: 7195.15,
    required: false,
  })
  close?: number;

  @ApiProperty({
    description: 'Galaxy 점수',
    example: 62,
    required: false,
  })
  galaxy_score?: number;

  @ApiProperty({
    description: '고가',
    example: 7195.15,
    required: false,
  })
  high?: number;

  @ApiProperty({
    description: '저가',
    example: 7174.94,
    required: false,
  })
  low?: number;

  @ApiProperty({
    description: '시가총액',
    example: 130394101536,
    required: false,
  })
  market_cap?: number;

  @ApiProperty({
    description: '시장 점유율',
    example: 67.8886,
    required: false,
  })
  market_dominance?: number;

  @ApiProperty({
    description: '시가',
    example: 7194.89,
    required: false,
  })
  open?: number;

  @ApiProperty({
    description: '24시간 거래량',
    example: 21187883711,
    required: false,
  })
  volume_24h?: number;
}

export class TimeSeriesResponseDto {
  @ApiProperty({
    description: '시계열 데이터 배열',
    type: [TimeSeriesDataDto],
  })
  data: TimeSeriesDataDto[];

  @ApiProperty({
    description: '토픽 심볼',
    example: 'BTC',
  })
  topic: string;

  @ApiProperty({
    description: '시간 간격',
    example: 'day',
  })
  bucket: string;
}
