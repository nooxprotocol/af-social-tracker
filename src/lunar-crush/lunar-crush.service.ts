import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import {
  TopicResponse,
  TopicPostsResponse,
  SearchResponse,
} from './interfaces/lunar-crush.interface';
import { HttpService } from '@nestjs/axios';
import { isEmptyObject } from 'src/utils/object.utils';
import { TimeSeriesResponseDto } from './dto/time-series-response.dto';
import {
  TransformedTimeSeriesResponseDto,
  TransformedTimeSeriesDataDto,
} from './dto/transformed-time-series.dto';
import { NewsResponseDto } from './dto/news-response.dto';

@Injectable()
export class LunarCrushService {
  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly logger = new Logger(LunarCrushService.name);

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {
    const apiKey = this.configService.get<string>('LUNARCRUSH_API_KEY');
    const apiUrl = this.configService.get<string>('LUNARCRUSH_API_URL');

    if (!apiKey || !apiUrl) {
      throw new Error('LunarCrush API configuration is missing');
    }

    this.apiKey = apiKey;
    this.apiUrl = apiUrl;
  }

  private async makeRequest<T>(
    endpoint: string,
    params: Record<string, string | number> = {},
  ): Promise<T> {
    try {
      this.logger.log(
        `Making request to ${this.apiUrl}${endpoint} with params: ${JSON.stringify(params)}`,
      );

      const response = await axios.get<T>(`${this.apiUrl}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: 'application/json',
        },
        params: {
          ...params,
          key: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        this.logger.error(`LunarCrush API error: ${axiosError.message}`);
        this.logger.error(`Status: ${axiosError.response?.status}`);
        this.logger.error(
          `Response data: ${JSON.stringify(axiosError.response?.data)}`,
        );

        if (axiosError.code === 'ENOTFOUND') {
          throw new Error(
            `LunarCrush API 서버에 연결할 수 없습니다. URL을 확인해주세요: ${this.apiUrl}`,
          );
        }

        throw new Error(`LunarCrush API 오류: ${axiosError.message}`);
      }
      throw error;
    }
  }

  async getTopicData(topic: string): Promise<TopicResponse> {
    return this.makeRequest<TopicResponse>(`/topic/${topic}/v1`);
  }

  async getTopicPosts(
    topic: string,
    start?: number,
    end?: number,
  ): Promise<TopicPostsResponse> {
    const params: Record<string, string | number> = { topic };

    if (start) {
      params.start = start;
    }

    if (end) {
      params.end = end;
    }

    return this.makeRequest<TopicPostsResponse>(
      `/topic/${topic}/posts/v1`,
      params,
    );
  }

  async search(term?: string, searchJson?: string): Promise<SearchResponse> {
    const params = new URLSearchParams();
    if (term) {
      params.append('term', term);
    }
    if (searchJson && !isEmptyObject(searchJson) && searchJson.trim() !== '') {
      try {
        JSON.parse(searchJson);
        params.append('search_json', searchJson);
      } catch (error) {
        this.logger.error(
          `Invalid JSON format for search_json: ${searchJson}`,
          error,
        );
        throw new Error('search_json object is not formatted correctly');
      }
    }

    const response = await this.httpService.axiosRef.get<SearchResponse>(
      `${this.apiUrl}/searches/search`,
      {
        params,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    // Add creator_id to each item in the response data
    const transformedData = response.data.data.map(item => ({
      ...item,
      creator_id: item.text.split(' ')[0] || '',
    }));

    return {
      ...response.data,
      data: transformedData,
    };
  }

  async getTopicTimeSeries(
    topic: string,
    bucket?: string,
    limit?: number,
  ): Promise<TransformedTimeSeriesResponseDto> {
    const params: Record<string, string> = {};

    if (bucket) {
      params.bucket = bucket;
    }

    const response = await this.makeRequest<TimeSeriesResponseDto>(
      `/topic/${topic}/time-series/v2`,
      params,
    );

    // 데이터 변환 로직
    const transformedData = new TransformedTimeSeriesDataDto();

    // 모든 가능한 키 목록 (time 제외)
    const possibleKeys = [
      'contributors_active',
      'contributors_created',
      'interactions',
      'posts_active',
      'posts_created',
      'sentiment',
      'spam',
      'alt_rank',
      'close',
      'galaxy_score',
      'high',
      'low',
      'market_cap',
      'market_dominance',
      'open',
      'volume_24h',
    ];

    // 데이터 제한 (limit이 지정된 경우)
    let dataToProcess = response.data;
    if (limit && limit > 0) {
      // 최신 데이터 n개만 선택 (배열의 마지막 n개)
      dataToProcess = response.data.slice(-limit);
    }

    // time 배열 초기화
    transformedData.time = dataToProcess.map(item => item.time);

    // 각 키별로 배열 생성
    possibleKeys.forEach(key => {
      transformedData[key] = dataToProcess.map(item => item[key] ?? 0);
    });

    return {
      data: transformedData,
      topic: response.topic,
      bucket: response.bucket,
    };
  }

  async getTopicNews(topic: string): Promise<NewsResponseDto> {
    return this.makeRequest<NewsResponseDto>(`/topic/${topic}/news/v1`);
  }
}
