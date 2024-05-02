import {ShortUrlEntity} from '../models/short-url.entity';
import {ShortUrlRepository} from './short-url.repository';

export class ShortUrlInMemoryRepository implements ShortUrlRepository {

    private shortUrls: Map<string, ShortUrlEntity> = new Map<string, ShortUrlEntity>();

    findAll(): ShortUrlEntity[] {
        return Array.from(this.shortUrls.values());
    }

    create(shortUrl: ShortUrlEntity): ShortUrlEntity {
        this.shortUrls.set(shortUrl.shortUrl, shortUrl);
        return shortUrl;
    }

    findByShortUrl(shortUrl: string): ShortUrlEntity | undefined {
        return this.shortUrls.get(shortUrl);
    }

    incrementClicks(shortUrl: string): void {
        const shortUrlEntity: ShortUrlEntity | undefined = this.findByShortUrl(shortUrl);
        if (!shortUrlEntity) {
            throw Error('Short url not found.')
        }
        shortUrlEntity.nbClicks++;
    }

    findByOriginalUrl(url: string): ShortUrlEntity | undefined {
        return Array.from(this.shortUrls.values()).find(shortUrl => shortUrl.originalUrl === url);
    }

}
