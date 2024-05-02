import express, {Router} from 'express';
import {ShortUrlController} from '../controllers/short-url.controller';

export const router: Router = express.Router();

const shortUrlPath: string = '/shorturl'
const shortUrlController: ShortUrlController = new ShortUrlController();

router.get(`${shortUrlPath}/analytics`, shortUrlController.getShortUrlsAnalytics)
router.post(shortUrlPath, shortUrlController.createShortUrl);
router.get(`${shortUrlPath}/:shortUrl`, shortUrlController.redirectShortUrl)
