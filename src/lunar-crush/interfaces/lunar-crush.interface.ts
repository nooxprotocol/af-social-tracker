export interface LunarCrushResponse {
  data: any;
  status: string;
  timestamp: number;
}

export interface SentimentDetail {
  positive: number;
  neutral: number;
  negative: number;
}

export interface TopicData {
  topic: string;
  title: string;
  topic_rank: number;
  related_topics: string[];
  types_count: {
    tweet: number;
    'youtube-video': number;
    'reddit-post': number;
    [key: string]: number;
  };
  types_interactions: {
    tweet: number;
    'youtube-video': number;
    'reddit-post': number;
    [key: string]: number;
  };
  types_sentiment: {
    tweet: number;
    'youtube-video': number;
    'reddit-post': number;
    [key: string]: number;
  };
  types_sentiment_detail: {
    tweet: SentimentDetail;
    'youtube-video': SentimentDetail;
    'reddit-post': SentimentDetail;
    [key: string]: SentimentDetail;
  };
  interactions_24h: number;
  num_contributors: number;
  num_posts: number;
  categories: string[];
  trend: string;
  [key: string]: any;
}

export interface PostData {
  id: string;
  post_type: string;
  post_title: string;
  post_created: number;
  post_sentiment: number;
  post_link: string;
  post_image: string | null;
  interactions_total: number;
  creator_id: string;
  creator_name: string;
  creator_display_name: string;
  creator_followers: number;
  creator_avatar: string;
  [key: string]: any;
}

export interface TopicResponse extends LunarCrushResponse {
  data: TopicData;
}

export interface TopicPostsResponse extends LunarCrushResponse {
  data: PostData[];
}

export interface SearchTerm {
  term: string;
  includes?: string[];
  excludes?: string[];
}

// 소셜 미디어 게시물 타입 정의
export type PostType = 'tweet' | 'youtube-video' | 'reddit-post';

// 검색 결과의 개별 게시물 인터페이스
export interface SearchResultPost {
  /** 게시물의 고유 ID */
  id: string;

  /** 게시물의 타입 (tweet, youtube-video, reddit-post) */
  post_type: PostType;

  /** 게시물의 원본 텍스트 */
  text: string;

  /** 검색어가 하이라이트된 텍스트 */
  text_highlight: string;

  /** 게시물 생성 시간 (Unix timestamp) */
  post_created: number;

  /** 게시물 원본 링크 */
  post_link: string;
}

// 검색 API 응답 인터페이스
export interface SearchResponse {
  /** 검색 결과 게시물 목록 */
  data: SearchResultPost[];

  /** API 응답 상태 */
  status: string;

  /** API 응답 시간 (Unix timestamp) */
  timestamp: number;
}
