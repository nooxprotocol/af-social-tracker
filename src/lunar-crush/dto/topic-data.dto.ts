import { ApiProperty } from '@nestjs/swagger';

export class SentimentDetailDto {
  @ApiProperty({ description: '긍정적 감정 수' })
  positive: number;

  @ApiProperty({ description: '중립적 감정 수' })
  neutral: number;

  @ApiProperty({ description: '부정적 감정 수' })
  negative: number;
}

export class TopicDataDto {
  @ApiProperty({ description: '토픽 식별자' })
  topic: string;

  @ApiProperty({ description: '토픽 제목' })
  title: string;

  @ApiProperty({ description: '토픽 순위' })
  topic_rank: number;

  @ApiProperty({ description: '관련 토픽 목록', type: [String] })
  related_topics: string[];

  @ApiProperty({ description: '소셜 미디어 타입별 게시물 수' })
  types_count: {
    tweet: number;
    'youtube-video': number;
    'reddit-post': number;
  };

  @ApiProperty({ description: '소셜 미디어 타입별 상호작용 수' })
  types_interactions: {
    tweet: number;
    'youtube-video': number;
    'reddit-post': number;
  };

  @ApiProperty({ description: '소셜 미디어 타입별 감정 점수' })
  types_sentiment: {
    tweet: number;
    'youtube-video': number;
    'reddit-post': number;
  };

  @ApiProperty({ description: '소셜 미디어 타입별 상세 감정 분석' })
  types_sentiment_detail: {
    tweet: SentimentDetailDto;
    'youtube-video': SentimentDetailDto;
    'reddit-post': SentimentDetailDto;
  };

  @ApiProperty({ description: '24시간 내 상호작용 수' })
  interactions_24h: number;

  @ApiProperty({ description: '기여자 수' })
  num_contributors: number;

  @ApiProperty({ description: '게시물 수' })
  num_posts: number;

  @ApiProperty({ description: '카테고리 목록', type: [String] })
  categories: string[];

  @ApiProperty({ description: '트렌드 방향 (up/down)' })
  trend: string;
}
