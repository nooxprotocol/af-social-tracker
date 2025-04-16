import { ApiProperty } from '@nestjs/swagger';

export class PostDataDto {
  @ApiProperty({ description: '게시물 ID' })
  id: string;

  @ApiProperty({ description: '게시물 타입 (youtube-video, tweet 등)' })
  post_type: string;

  @ApiProperty({ description: '게시물 제목' })
  post_title: string;

  @ApiProperty({ description: '게시물 생성 시간 (Unix timestamp)' })
  post_created: number;

  @ApiProperty({ description: '게시물 감정 점수' })
  post_sentiment: number;

  @ApiProperty({ description: '게시물 링크' })
  post_link: string;

  @ApiProperty({ description: '게시물 이미지 URL', nullable: true })
  post_image: string | null;

  @ApiProperty({ description: '총 상호작용 수 (좋아요, 리트윗, 댓글 등)' })
  interactions_total: number;

  @ApiProperty({ description: '작성자 ID' })
  creator_id: string;

  @ApiProperty({ description: '작성자 계정명' })
  creator_name: string;

  @ApiProperty({ description: '작성자 표시 이름' })
  creator_display_name: string;

  @ApiProperty({ description: '작성자 팔로워 수' })
  creator_followers: number;

  @ApiProperty({ description: '작성자 프로필 이미지 URL' })
  creator_avatar: string;
}
