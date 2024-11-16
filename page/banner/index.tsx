import { Component } from "@acryps/page";
import { HistoryEntryViewModel } from "../managed/services";

export class BannerComponent extends Component {
	private readonly generatorFunctionSignature = 'layerGenerator';

	readonly width = 20;
	readonly height = 40;

	static readonly colors = ['black', 'blue', 'brown', 'cyan', 'gray', 'green', 'lightBlue', 'lightGray', 'lime', 'magenta', 'orange', 'pink', 'purple', 'red', 'white', 'yellow'];

	static maxLayerCount = 7;

	layers: { offset: number, color: string }[] = [];

	constructor(
		public baseColor: string
	) {
		super();
	}

	render() {
		const bannerCanvas = document.createElement('canvas');
		bannerCanvas.width = this.width;
		bannerCanvas.height = this.height;

		requestAnimationFrame(async () => {
			console.log(this.layers)

			const image = new Image();
			image.src = '/assets/banner/index.webp';

			await new Promise<void>(done => image.onload = () => done());

			if (image.naturalHeight != this.height) {
				throw new Error('Invalid banner source image height');
			}

			const sourceCanvas = new OffscreenCanvas(image.naturalWidth, image.naturalHeight);
			const sourceContext = sourceCanvas.getContext('2d');
			sourceContext.drawImage(image, 0, 0);

			const sourceData = sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);

			const bannerContext = bannerCanvas.getContext('2d');
			bannerContext.fillStyle = this.baseColor;
			bannerContext.fillRect(0, 0, this.width, this.height);

			const placingCanvas = new OffscreenCanvas(this.width, this.height);
			const placingContext = placingCanvas.getContext('2d');

			for (let layer of this.layers) {
				// use disused source canvas to convert color string to bitmap color value
				sourceContext.fillStyle = layer.color;
				sourceContext.fillRect(0, 0, 1, 1);

				const color = sourceContext.getImageData(0, 0, 1, 1);
				const image = new ImageData(this.width, this.height);

				for (let x = 0; x < this.width; x++) {
					for (let y = 0; y < this.height; y++) {
						const intensity = 0xff - sourceData.data[(y * sourceCanvas.width + x + layer.offset * this.width) * 4 + 3];

						image.data[(y * this.width + x) * 4 + 0] = color.data[0];
						image.data[(y * this.width + x) * 4 + 1] = color.data[1];
						image.data[(y * this.width + x) * 4 + 2] = color.data[2];
						image.data[(y * this.width + x) * 4 + 3] = intensity;
					}
				}

				placingContext.putImageData(image, 0, 0);
				bannerContext.drawImage(placingCanvas, 0, 0);
			}
		});

		return <ui-banner>
			{bannerCanvas}
		</ui-banner>;
	}

	static unpack(source: string) {
		const packed = JSON.parse(decodeURIComponent(atob(source)));
		const banner = new BannerComponent(packed[0]);

		for (let layer of packed[1]) {
			banner.layers.push({
				offset: layer[0],
				color: layer[1]
			});
		}

		return banner;
	}

	pack() {
		return btoa(encodeURIComponent(JSON.stringify([
			this.baseColor,
			this.layers.map(layer => [layer.offset, layer.color])
		])));
	}

	static get default() {
		return new BannerComponent('#fff');
	}

	get layerTypes() {
		const types: { add: Function, offset: number }[] = [];

		for (let key in this) {
			if (typeof this[key] == 'function' && this.generatorFunctionSignature in this[key]) {
				types.push({
					add: this[key],
					offset: this[key][this.generatorFunctionSignature] as number
				});
			}
		}

		return types;
	}

	// order must be order from source image
	layerOffset = 2;

	addBordure = this.makeLayer();
	addFieldMasoned = this.makeLayer();
	addRoundel = this.makeLayer();
	addCreeperCharge = this.makeLayer();
	addSaltire = this.makeLayer();
	addBordureIndented = this.makeLayer();
	addPerBendSinister = this.makeLayer();
	addPerBend = this.makeLayer();
	addFlowerCharge = this.makeLayer();
	addGradient = this.makeLayer();
	addPerFess = this.makeLayer();
	addPerPale = this.makeLayer();
	addThing = this.makeLayer();
	addLozenge = this.makeLayer();
	addSkullCharge = this.makeLayer();
	addPaly = this.makeLayer();
	addBaseDexterCanton = this.makeLayer();
	addBaseSinisterCanton = this.makeLayer();
	addChiefDexterCanton = this.makeLayer();
	addChiefSinisterCanton = this.makeLayer();
	addCross = this.makeLayer();
	addBase = this.makeLayer();
	addPale = this.makeLayer();
	addBendSinister = this.makeLayer();
	addBend = this.makeLayer();
	addPaleDexter = this.makeLayer();
	addFess = this.makeLayer();
	addPaleSinister = this.makeLayer();
	addChief = this.makeLayer();
	addBaseIndented = this.makeLayer();
	addChiefIndented = this.makeLayer();
	addChevron = this.makeLayer();
	addInvertedChevron = this.makeLayer();
	addPerBendInverted = this.makeLayer();
	addPerBendSinisterInverted = this.makeLayer();
	addBaseGradient = this.makeLayer();
	addPerFessInverted = this.makeLayer();
	addPerPaleInverted = this.makeLayer();
	addGlobe = this.makeLayer();
	addSnout = this.makeLayer();
	addFlow = this.makeLayer();
	addGuster = this.makeLayer();

	private makeLayer() {
		const banner = this;
		const offset = this.layerOffset++;

		const generator = (color: string) => {
			banner.layers.push({
				offset,
				color
			});

			return banner;
		};

		generator[this.generatorFunctionSignature] = offset;

		return generator;
	}
}