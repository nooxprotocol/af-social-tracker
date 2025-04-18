import { Controller, Get, Query, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { LunarCrushService } from './lunar-crush.service';
import {
  TopicResponse,
  TopicPostsResponse,
  SearchResponse,
} from './interfaces/lunar-crush.interface';
import { TopicDataDto } from './dto/topic-data.dto';
import { PostDataDto } from './dto/post-data.dto';
import { TopicPostsQueryDto } from './dto/topic-posts-query.dto';
import { SearchResponseDto } from './dto/search-response.dto';
import { SearchJsonDto, SearchJsonSwaggerInputDto } from './dto/search.dto';
import { TransformedTimeSeriesResponseDto } from './dto/transformed-time-series.dto';
import { NewsResponseDto } from './dto/news-response.dto';

@ApiTags('LunarCrush')
@Controller('lunar-crush')
export class LunarCrushController {
  constructor(private readonly lunarCrushService: LunarCrushService) {}

  @Get('topic/:topic')
  @ApiOperation({
    summary: '토픽 데이터 조회',
    description: '특정 토픽(코인)의 데이터를 조회합니다.',
  })
  @ApiParam({ name: 'topic', description: '토픽 심볼 (예: BTC, ETH)' })
  @ApiResponse({ status: 200, description: '성공', type: TopicDataDto })
  async getTopicData(@Param('topic') topic: string): Promise<TopicResponse> {
    return this.lunarCrushService.getTopicData(topic);
  }

  @Get('topic/:topic/posts')
  @ApiOperation({
    summary: '토픽 게시물 조회',
    description:
      '특정 토픽의 게시물을 조회합니다. 시작 시간이 제공되면 해당 기간 동안의 상호작용이 많은 게시물을 반환하고, 제공되지 않으면 최근 24시간 동안의 상호작용이 많은 게시물을 반환합니다.',
  })
  @ApiParam({ name: 'topic', description: '토픽 심볼 (예: BTC, ETH)' })
  @ApiQuery({
    name: 'start',
    required: false,
    description: '시작 시간 (Unix timestamp, 초 단위)',
    example: Number(
      Math.floor((new Date().getTime() - 24 * 60 * 60 * 1000) / 1000),
    ),
    type: Number,
  })
  @ApiQuery({
    name: 'end',
    required: false,
    description: '종료 시간 (Unix timestamp, 초 단위)',
    example: Math.floor(Number(new Date()) / 1000),
    type: Number,
  })
  @ApiResponse({ status: 200, description: '성공', type: [PostDataDto] })
  async getTopicPosts(
    @Param('topic') topic: string,
    @Query() query: TopicPostsQueryDto,
  ): Promise<TopicPostsResponse> {
    return this.lunarCrushService.getTopicPosts(topic, query.start, query.end);
  }

  @Get('searches/search')
  @ApiOperation({
    summary: '소셜 게시물 검색',
    description:
      '단일 검색어 또는 문구와 일치하는 최근의 인기 소셜 게시물을 검색합니다.',
  })
  @ApiQuery({
    name: 'term',
    required: false,
    description: '소셜 게시물을 검색할 단일 검색어 또는 문구',
    example: 'bitcoin',
  })
  @ApiQuery({
    name: 'search_json',
    required: false,
    description: `JSON 형식의 사용자 지정 검색 설정`,
    type: () => SearchJsonSwaggerInputDto,
  })
  @ApiResponse({
    status: 200,
    description: '검색 결과',
    type: SearchResponseDto,
  })
  async search(
    @Query('term') term?: string,
    @Query('search_json') searchJson?: SearchJsonDto,
  ): Promise<SearchResponse> {
    return this.lunarCrushService.search(
      term,
      searchJson ? JSON.stringify(searchJson) : undefined,
    );
  }

  @Get('topic-time-series')
  @ApiOperation({ summary: 'Get topic time series data' })
  @ApiQuery({
    name: 'topic',
    required: true,
    description: '토픽 심볼 (예: BTC)',
  })
  @ApiQuery({
    name: 'bucket',
    required: false,
    description: '시간 간격 (예: day, hour)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '반환할 최신 데이터 포인트 수 (기본값: 전체)',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns transformed time series data',
    type: TransformedTimeSeriesResponseDto,
  })
  async getTopicTimeSeries(
    @Query('topic') topic: string,
    @Query('bucket') bucket?: string,
    @Query('limit') limit?: number,
  ): Promise<TransformedTimeSeriesResponseDto> {
    return this.lunarCrushService.getTopicTimeSeries(topic, bucket, limit);
  }

  @Get('topic/:topic/news')
  @ApiOperation({
    summary: '토픽 뉴스 조회',
    description: '특정 토픽에 대한 뉴스 데이터를 조회합니다.',
  })
  @ApiParam({ name: 'topic', description: '토픽 심볼 (예: BTC, ETH)' })
  @ApiResponse({
    status: 200,
    description: '뉴스 데이터',
    type: NewsResponseDto,
  })
  async getTopicNews(@Param('topic') topic: string): Promise<NewsResponseDto> {
    return this.lunarCrushService.getTopicNews(topic);
  }
}
