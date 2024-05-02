export class ShortUrlEntity {

    constructor(public originalUrl: string, public shortUrl: string, public nbClicks: number = 0) {
    }


}
