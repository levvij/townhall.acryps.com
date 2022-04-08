export class Point {
    constructor(
        public x,
        public y
    ) {}

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    copy(x = 0, y = 0) {
        return new Point(this.x + x, this.y + y);
    }

    static unpack(source: string) {
        return source.split(";").map(source => new Point(+source.split(",")[0], +source.split(",")[1]))
    }

    static pack(points: Point[]) {
        return points.map(point => `${point.x},${point.y}`).join(";");
    }

    static center(points: Point[]) {
        const minX = Math.min(...points.map(point => point.x));
        const maxX = Math.max(...points.map(point => point.x));

        const minY = Math.min(...points.map(point => point.y));
        const maxY = Math.max(...points.map(point => point.y));
              
        return new Point(minX + (maxX - minX) * 0.5, minY + (maxY - minY) * 0.5);
    }

    static topLeft(points: Point[]) {
        return [...points].sort((a, b) => (a.x + a.y) - (b.x + b.y))[0];
    }

    static midsect(points: Point[], close: boolean) {
        if (points.length < 2) {
            return [];
        }

        const midsection = [];

        const minX = Math.min(...points.map(point => point.x));
        const maxX = Math.max(...points.map(point => point.x));

        const minY = Math.min(...points.map(point => point.y));
        const maxY = Math.max(...points.map(point => point.y));

        const width = maxX - minX + 1;
        const height = maxY - minY + 1;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.moveTo(points[0].x - minX + 0.5, points[0].y - minY + 0.5);

        for (let point of points.slice(1)) {
            ctx.lineTo(point.x - minX + 0.5, point.y - minY + 0.5);
        }

        if (close) {
            ctx.closePath();
        }

        ctx.stroke();

        const data = ctx.getImageData(0, 0, width, height).data;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (data[(x + y * width) * 4 + 3] > 0x2f) {
                    midsection.push(new Point(minX + x, minY + y));
                }
            }
        }

        return midsection;
    }
}