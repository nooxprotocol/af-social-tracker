import { ApiProperty } from '@nestjs/swagger';

export class TransformedTimeSeriesDataDto {
  @ApiProperty({
    description: '시간 배열 (Unix timestamp)',
    example: [1577836800, 1577840400],
  })
  time: number[];

  @ApiProperty({
    description: '활성 기여자 수 배열',
    example: [645, 600],
    required: false,
  })
  contributors_active?: (number | null)[];

  @ApiProperty({
    description: '새로 생성된 기여자 수 배열',
    example: [395, 380],
    required: false,
  })
  contributors_created?: (number | null)[];

  @ApiProperty({
    description: '상호작용 수 배열',
    example: [521961, 500000],
    required: false,
  })
  interactions?: (number | null)[];

  @ApiProperty({
    description: '활성 게시물 수 배열',
    example: [1115, 1000],
    required: false,
  })
  posts_active?: (number | null)[];

  @ApiProperty({
    description: '새로 생성된 게시물 수 배열',
    example: [825, 800],
    required: false,
  })
  posts_created?: (number | null)[];

  @ApiProperty({
    description: '감성 점수 배열',
    example: [30, 35],
    required: false,
  })
  sentiment?: (number | null)[];

  @ApiProperty({
    description: '스팸 수 배열',
    example: [140, 130],
    required: false,
  })
  spam?: (number | null)[];

  @ApiProperty({
    description: 'Alt 순위 배열',
    example: [33, 32],
    required: false,
  })
  alt_rank?: (number | null)[];

  @ApiProperty({
    description: '종가 배열',
    example: [7195.15, 7200.0],
    required: false,
  })
  close?: (number | null)[];

  @ApiProperty({
    description: 'Galaxy 점수 배열',
    example: [62, 63],
    required: false,
  })
  galaxy_score?: (number | null)[];

  @ApiProperty({
    description: '고가 배열',
    example: [7195.15, 7200.0],
    required: false,
  })
  high?: (number | null)[];

  @ApiProperty({
    description: '저가 배열',
    example: [7174.94, 7180.0],
    required: false,
  })
  low?: (number | null)[];

  @ApiProperty({
    description: '시가총액 배열',
    example: [130394101536, 131000000000],
    required: false,
  })
  market_cap?: (number | null)[];

  @ApiProperty({
    description: '시장 점유율 배열',
    example: [67.8886, 68.0],
    required: false,
  })
  market_dominance?: (number | null)[];

  @ApiProperty({
    description: '시가 배열',
    example: [7194.89, 7195.0],
    required: false,
  })
  open?: (number | null)[];

  @ApiProperty({
    description: '24시간 거래량 배열',
    example: [21187883711, 21200000000],
    required: false,
  })
  volume_24h?: (number | null)[];
}

export class TransformedTimeSeriesResponseDto {
  @ApiProperty({
    description: '변환된 시계열 데이터',
    type: TransformedTimeSeriesDataDto,
  })
  data: TransformedTimeSeriesDataDto;

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
