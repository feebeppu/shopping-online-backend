import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getCache<T>(key: string, requestCache: () => Promise<T>): Promise<T> {
    const allDataCache: T = await this.cacheManager.get(key);

    if (allDataCache) {
      return allDataCache;
    }

    const values: T = await requestCache();

    await this.cacheManager.set(key, values);
    return values;
  }
}
