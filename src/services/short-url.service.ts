import {ShortUrlEntity} from '../models/short-url.entity';
import {isURL} from 'validator';
import {randomBytes} from "crypto";
import {ShortUrlRepository} from "../repositories/short-url.repository";


export class ShortUrlService {

    constructor(private shortUrlRepository: ShortUrlRepository) {
    }

    private generateRandomString(length: number): string {
        return randomBytes(length).toString("base64url").slice(0, length);
    }


    createShortUrl(originalUrl?: string): ShortUrlEntity {

        if (!originalUrl) {
            throw Error('Missing url.')
        }

        if (!isURL(originalUrl)) {
            throw Error('Invalid url.');
        }

        const existingShortUrl = this.shortUrlRepository.findByOriginalUrl(originalUrl)
        if (existingShortUrl) {
            return existingShortUrl;
        }

        const randomString: string = this.generateRandomString(6);
        const shortUrlEntity: ShortUrlEntity = new ShortUrlEntity(originalUrl, randomString);
        return this.shortUrlRepository.create(shortUrlEntity);
    }

    findAllUrls(): ShortUrlEntity[] {
        return this.shortUrlRepository.findAll();
    }

    findByShortUrl(shortUrl: string): ShortUrlEntity | undefined {
        return this.shortUrlRepository.findByShortUrl(shortUrl);
    }

    findOriginalUrl(shortUrl: string): string | undefined {
        const shortUrlEntity: ShortUrlEntity | undefined = this.findByShortUrl(shortUrl);
        if (!shortUrlEntity) {
            return undefined;
        }

        this.shortUrlRepository.incrementClicks(shortUrl);
        const urlHasProtocol: boolean = isURL(shortUrlEntity.originalUrl, {require_protocol: true});
        if (!urlHasProtocol) {
            return `https://${shortUrlEntity.originalUrl}`;
        }
        return shortUrlEntity.originalUrl;
    }
}
