import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '../interfaces/lunar-crush.interface';

export class SearchResultPostDto {
  @ApiProperty({
    description: '게시물의 고유 ID',
    example: '1911914258780074125',
  })
  id: string;

  @ApiProperty({
    description: '게시물의 타입',
    enum: ['tweet', 'youtube-video', 'reddit-post'],
    example: 'tweet',
  })
  post_type: PostType;

  @ApiProperty({
    description: '게시물의 원본 텍스트',
    example: 'This is a sample post text',
  })
  text: string;

  @ApiProperty({
    description: '검색어가 하이라이트된 텍스트',
    example: 'This is a <b>sample</b> post text',
  })
  text_highlight: string;

  @ApiProperty({
    description: '게시물 생성 시간 (Unix timestamp)',
    example: 1744670855,
  })
  post_created: number;

  @ApiProperty({
    description: '게시물 원본 링크',
    example: 'https://x.com/anyuser/status/1911914258780074125',
  })
  post_link: string;
}

export class SearchResponseDto {
  @ApiProperty({
    description: '검색 결과 게시물 목록',
    type: [SearchResultPostDto],
  })
  data: SearchResultPostDto[];

  @ApiProperty({
    description: 'API 응답 상태',
    example: 'success',
  })
  status: string;

  @ApiProperty({
    description: 'API 응답 시간 (Unix timestamp)',
    example: 1744670855,
  })
  timestamp: number;
}
