import {ShortUrlService} from './short-url.service';
import {ShortUrlCreateDto} from '../controllers/dtos/short-url-create.dto';
import {ShortUrlEntity} from '../models/short-url.entity';
import {ShortUrlInMemoryRepository} from "../repositories/short-url.in-memory.repository";

let shortUrlService: ShortUrlService;

const validUrls: string[] = [
    'www.lunii.com',
    'http://www.lunii.com',
    'https://www.lunii.com',
    'https://lunii.com'
]

const invalidUrls: string[] = [
    'lunii',
    'https://lunii'
]


beforeEach(() => {
    shortUrlService = new ShortUrlService(new ShortUrlInMemoryRepository());
});

it('should exist', () => {
    expect(shortUrlService).toBeDefined();
});

it.each(validUrls)('should create a shortened url with a valid url', (validUrl: string) => {

    let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl(validUrl);

    expect(createdUrl.originalUrl).toBe(validUrl);
    expect(createdUrl.shortUrl).toHaveLength(6);
    expect(createdUrl.nbClicks).toBe(0);
});

it.each(invalidUrls)('should fail to create a shortened url with an invalid url', (invalidUrl) => {
    let shortUrlCreateDto: ShortUrlCreateDto = {
        url: invalidUrl,
    };

    expect(() => shortUrlService.createShortUrl(invalidUrl)).toThrow('Invalid url.')
});

it('should fail to create a shortened url with a missing url', () => {
    expect(() => shortUrlService.createShortUrl(undefined)).toThrow('Missing url.');
});

it('should get original url', () => {

    let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl('http://www.lunii.com');
    let foundUrl: string | undefined = shortUrlService.findOriginalUrl(createdUrl.shortUrl);
    expect(foundUrl).toBe('http://www.lunii.com');

});

it('should get original url with protocol', () => {
    let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl('www.lunii.com');
    let foundUrl: string | undefined = shortUrlService.findOriginalUrl(createdUrl.shortUrl);
    expect(foundUrl).toBe('https://www.lunii.com');

});

it('should increase number of clicks', () => {
    let createdUrl: ShortUrlEntity = shortUrlService.createShortUrl('www.lunii.com');
    shortUrlService.findOriginalUrl(createdUrl.shortUrl);
    let shortUrl: ShortUrlEntity | undefined = shortUrlService.findByShortUrl(createdUrl.shortUrl);
    expect(shortUrl?.nbClicks).toBe(1);
});
