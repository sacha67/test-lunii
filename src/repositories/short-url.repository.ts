import {ShortUrlEntity} from '../models/short-url.entity';

export interface ShortUrlRepository {
    findAll(): ShortUrlEntity[];

    create(shortUrl: ShortUrlEntity): ShortUrlEntity;

    findByShortUrl(shortUrl: string): ShortUrlEntity | undefined;

    incrementClicks(shortUrl: string): void;

    findByOriginalUrl(url: string): ShortUrlEntity | undefined;
}