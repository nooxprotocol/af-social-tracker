import { ApiProperty } from '@nestjs/swagger';

export class NewsItemDto {
  @ApiProperty({
    description: 'LunarCrush 내부 ID',
    example: 'news.bitcoin.com-2847411362',
  })
  id: string;

  @ApiProperty({
    description: '소셜 포스트 타입',
    example: 'news',
  })
  post_type: string;

  @ApiProperty({
    description: '소셜 포스트 제목',
    example:
      'Solana ETFs Launch on Toronto Stock Exchange – Crypto News Bitcoin News',
  })
  post_title: string;

  @ApiProperty({
    description: '소셜 포스트 URL',
    example:
      'https://news.bitcoin.com/solana-etfs-launch-on-toronto-stock-exchange/',
  })
  post_link: string;

  @ApiProperty({
    description: '포스트 이미지 URL',
    example:
      'https://static.news.bitcoin.com/wp-content/uploads/2025/04/solana-etfs-launch-on-toronto-stock-exchange.jpg',
    required: false,
  })
  post_image?: string;

  @ApiProperty({
    description: '포스트 생성 시간 (Unix timestamp)',
    example: 1744950968,
  })
  post_created: number;

  @ApiProperty({
    description:
      '포스트 감성 점수 (1-5, 1: 매우 부정적, 3: 중립, 5: 매우 긍정적)',
    example: 3,
  })
  post_sentiment: number;

  @ApiProperty({
    description: '크리에이터 ID ([network]::[unique_id])',
    example: 'twitter::3367334171',
  })
  creator_id: string;

  @ApiProperty({
    description: '크리에이터 스크린 이름',
    example: 'BTCTN',
  })
  creator_name: string;

  @ApiProperty({
    description: '크리에이터 표시 이름',
    example: 'Bitcoin.com News',
  })
  creator_display_name: string;

  @ApiProperty({
    description: '크리에이터 팔로워 수',
    example: 3144548,
  })
  creator_followers: number;

  @ApiProperty({
    description: '크리에이터 아바타 URL',
    example:
      'https://pbs.twimg.com/profile_images/1651108008200482816/EJc2IcUa_200x200.jpg',
  })
  creator_avatar: string;

  @ApiProperty({
    description: '최근 24시간 상호작용 수',
    example: 20,
  })
  interactions_24h: number;

  @ApiProperty({
    description: '전체 상호작용 수',
    example: 20,
  })
  interactions_total: number;
}

export class NewsResponseDto {
  @ApiProperty({
    description: '뉴스 데이터 배열',
    type: [NewsItemDto],
  })
  data: NewsItemDto[];

  @ApiProperty({
    description: '토픽 심볼',
    example: 'BTC',
  })
  topic: string;
}
