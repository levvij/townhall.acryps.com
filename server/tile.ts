const fetch = require('node-fetch');
const sharp = require('sharp');

export class TileSet {
    size = 250;

    loader?: Promise<void>;
    image: Buffer;
    cache: Map<string, Buffer>;

    constructor(public source: string) {
        this.loader = this.reload();
    }

    reload() {
        setTimeout(() => this.reload(), 1000 * 60);

        return fetch(this.source).then(res => res.buffer()).then(res => {
            this.image = res;
            this.cache = new Map<string, Buffer>();
        });
    }

    async read(x: number, y: number) {
        await this.loader;

        if (this.cache[[x, y].join()]) {
            return this.cache[[x, y].join()];
        }

        try {
            // crop image
            const data = await sharp(this.image).extract({
                width: this.size,
                height: this.size,
                top: y * this.size,
                left: x * this.size
            }).toBuffer();

            return this.cache[[x, y].join()] = data;
        } catch {
            console.log('invalid tile', x, y);
        }
    }

    async area(x: number, y: number, width: number, height: number) {
        await this.loader;

        if (this.cache[[x, y, width, height].join()]) {
            return this.cache[[x, y, width, height].join()];
        }

        try {
            // crop image
            const data = await sharp(this.image).extract({
                width: width,
                height: height,
                top: y,
                left: x
            }).toBuffer();

            return this.cache[[x, y, width, height].join()] = data;
        } catch {
            console.log('invalid area', x, y, width, height);
        }
    }
}