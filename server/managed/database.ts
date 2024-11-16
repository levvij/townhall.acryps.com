import { Entity, DbSet, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference, View, ViewSet } from 'vlquery';

export class CompanyType extends QueryEnum {
	static readonly company = "company";
	static readonly governmentCompany = "government_company";
}

export class MapType extends QueryEnum {
	static readonly night = "night";
	static readonly overworld = "overworld";
}

export class ArticleQueryProxy extends QueryProxy {
	get publication(): Partial<PublicationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get body(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get publicationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get published(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get title(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Article extends Entity<ArticleQueryProxy> {
	images: PrimaryReference<ArticleImage, ArticleImageQueryProxy>;
		get publication(): Partial<ForeignReference<Publication>> { return this.$publication; }
	body: string;
	declare id: string;
	publicationId: string;
	published: Date;
	title: string;
	
	$$meta = {
		source: "article",
		columns: {
			body: { type: "text", name: "body" },
			id: { type: "uuid", name: "id" },
			publicationId: { type: "uuid", name: "publication_id" },
			published: { type: "timestamp", name: "published" },
			title: { type: "text", name: "title" }
		},
		get set(): DbSet<Article, ArticleQueryProxy> { 
			return new DbSet<Article, ArticleQueryProxy>(Article, null);
		}
	};
	
	constructor() {
		super();
		
		this.images = new PrimaryReference<ArticleImage, ArticleImageQueryProxy>(this, "articleId", ArticleImage);
		this.$publication = new ForeignReference<Publication>(this, "publicationId", Publication);
	}
	
	private $publication: ForeignReference<Publication>;

	set publication(value: Partial<ForeignReference<Publication>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.publicationId = value.id as string;
		} else {
			this.publicationId = null;
		}
	}

	
}
			
export class ArticleImageQueryProxy extends QueryProxy {
	get article(): Partial<ArticleQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get articleId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get caption(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get data(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class ArticleImage extends Entity<ArticleImageQueryProxy> {
	get article(): Partial<ForeignReference<Article>> { return this.$article; }
	articleId: string;
	caption: string;
	data: Buffer;
	declare id: string;
	
	$$meta = {
		source: "article_image",
		columns: {
			articleId: { type: "uuid", name: "article_id" },
			caption: { type: "text", name: "caption" },
			data: { type: "bytea", name: "data" },
			id: { type: "uuid", name: "id" }
		},
		get set(): DbSet<ArticleImage, ArticleImageQueryProxy> { 
			return new DbSet<ArticleImage, ArticleImageQueryProxy>(ArticleImage, null);
		}
	};
	
	constructor() {
		super();
		
		this.$article = new ForeignReference<Article>(this, "articleId", Article);
	}
	
	private $article: ForeignReference<Article>;

	set article(value: Partial<ForeignReference<Article>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.articleId = value.id as string;
		} else {
			this.articleId = null;
		}
	}

	
}
			
export class BoroughQueryProxy extends QueryProxy {
	get aiDescription(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get aiSummary(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get banner(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get incorporation(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyPrefix(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get survey(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ttsDescription(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Borough extends Entity<BoroughQueryProxy> {
	properties: PrimaryReference<Property, PropertyQueryProxy>;
		squares: PrimaryReference<Square, SquareQueryProxy>;
		aiDescription: string;
	aiSummary: string;
	banner: string;
	bounds: string;
	color: string;
	description: string;
	declare id: string;
	incorporation: Date;
	name: string;
	propertyPrefix: string;
	shortName: string;
	survey: boolean;
	tag: string;
	ttsDescription: string;
	
	$$meta = {
		source: "borough",
		columns: {
			aiDescription: { type: "text", name: "ai_description" },
			aiSummary: { type: "text", name: "ai_summary" },
			banner: { type: "text", name: "banner" },
			bounds: { type: "text", name: "bounds" },
			color: { type: "text", name: "color" },
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			incorporation: { type: "timestamp", name: "incorporation" },
			name: { type: "text", name: "name" },
			propertyPrefix: { type: "text", name: "property_prefix" },
			shortName: { type: "text", name: "short_name" },
			survey: { type: "bool", name: "survey" },
			tag: { type: "text", name: "tag" },
			ttsDescription: { type: "text", name: "tts_description" }
		},
		get set(): DbSet<Borough, BoroughQueryProxy> { 
			return new DbSet<Borough, BoroughQueryProxy>(Borough, null);
		}
	};
	
	constructor() {
		super();
		
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "boroughId", Property);
		this.squares = new PrimaryReference<Square, SquareQueryProxy>(this, "boroughId", Square);
	}
}
			
export class BridgeQueryProxy extends QueryProxy {
	get street(): Partial<StreetQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get streetId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Bridge extends Entity<BridgeQueryProxy> {
	get street(): Partial<ForeignReference<Street>> { return this.$street; }
	declare id: string;
	name: string;
	path: string;
	streetId: string;
	
	$$meta = {
		source: "bridge",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" },
			streetId: { type: "uuid", name: "street_id" }
		},
		get set(): DbSet<Bridge, BridgeQueryProxy> { 
			return new DbSet<Bridge, BridgeQueryProxy>(Bridge, null);
		}
	};
	
	constructor() {
		super();
		
		this.$street = new ForeignReference<Street>(this, "streetId", Street);
	}
	
	private $street: ForeignReference<Street>;

	set street(value: Partial<ForeignReference<Street>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.streetId = value.id as string;
		} else {
			this.streetId = null;
		}
	}

	
}
			
export class CompanyQueryProxy extends QueryProxy {
	get owner(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): "company" | "government_company" { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Company extends Entity<CompanyQueryProxy> {
	get owner(): Partial<ForeignReference<Player>> { return this.$owner; }
	created: Date;
	declare id: string;
	name: string;
	ownerId: string;
	type: CompanyType;
	
	$$meta = {
		source: "company",
		columns: {
			created: { type: "timestamp", name: "created" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			ownerId: { type: "uuid", name: "owner_id" },
			type: { type: "company_type", name: "type" }
		},
		get set(): DbSet<Company, CompanyQueryProxy> { 
			return new DbSet<Company, CompanyQueryProxy>(Company, null);
		}
	};
	
	constructor() {
		super();
		
		this.$owner = new ForeignReference<Player>(this, "ownerId", Player);
	}
	
	private $owner: ForeignReference<Player>;

	set owner(value: Partial<ForeignReference<Player>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.ownerId = value.id as string;
		} else {
			this.ownerId = null;
		}
	}

	
}
			
export class DwellingQueryProxy extends QueryProxy {
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Dwelling extends Entity<DwellingQueryProxy> {
	tenants: PrimaryReference<Tenancy, TenancyQueryProxy>;
		get property(): Partial<ForeignReference<Property>> { return this.$property; }
	declare id: string;
	propertyId: string;
	
	$$meta = {
		source: "dwelling",
		columns: {
			id: { type: "uuid", name: "id" },
			propertyId: { type: "uuid", name: "property_id" }
		},
		get set(): DbSet<Dwelling, DwellingQueryProxy> { 
			return new DbSet<Dwelling, DwellingQueryProxy>(Dwelling, null);
		}
	};
	
	constructor() {
		super();
		
		this.tenants = new PrimaryReference<Tenancy, TenancyQueryProxy>(this, "dwellingId", Tenancy);
		this.$property = new ForeignReference<Property>(this, "propertyId", Property);
	}
	
	private $property: ForeignReference<Property>;

	set property(value: Partial<ForeignReference<Property>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.propertyId = value.id as string;
		} else {
			this.propertyId = null;
		}
	}

	
}
			
export class HistoricListingGradeQueryProxy extends QueryProxy {
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get grade(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class HistoricListingGrade extends Entity<HistoricListingGradeQueryProxy> {
	listedProperties: PrimaryReference<Property, PropertyQueryProxy>;
		description: string;
	grade: number;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "historic_listing_grade",
		columns: {
			description: { type: "text", name: "description" },
			grade: { type: "int4", name: "grade" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy> { 
			return new DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>(HistoricListingGrade, null);
		}
	};
	
	constructor() {
		super();
		
		this.listedProperties = new PrimaryReference<Property, PropertyQueryProxy>(this, "historicListingGradeId", Property);
	}
}
			
export class HistoricListingModifierQueryProxy extends QueryProxy {
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class HistoricListingModifier extends Entity<HistoricListingModifierQueryProxy> {
	listedProperties: PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
		description: string;
	declare id: string;
	name: string;
	shortName: string;
	
	$$meta = {
		source: "historic_listing_modifier",
		columns: {
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			shortName: { type: "text", name: "short_name" }
		},
		get set(): DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy> { 
			return new DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>(HistoricListingModifier, null);
		}
	};
	
	constructor() {
		super();
		
		this.listedProperties = new PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(this, "historicListingModifierId", PropertyHistoricListingModifier);
	}
}
			
export class MapTileQueryProxy extends QueryProxy {
	get captured(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get complete(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get hash(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get image(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get regionX(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get regionY(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): "night" | "overworld" { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class MapTile extends Entity<MapTileQueryProxy> {
	captured: Date;
	complete: boolean;
	hash: string;
	declare id: string;
	image: Buffer;
	regionX: number;
	regionY: number;
	type: MapType;
	
	$$meta = {
		source: "map_tile",
		columns: {
			captured: { type: "timestamp", name: "captured" },
			complete: { type: "bool", name: "complete" },
			hash: { type: "text", name: "hash" },
			id: { type: "uuid", name: "id" },
			image: { type: "bytea", name: "image" },
			regionX: { type: "int4", name: "region_x" },
			regionY: { type: "int4", name: "region_y" },
			type: { type: "map_type", name: "type" }
		},
		get set(): DbSet<MapTile, MapTileQueryProxy> { 
			return new DbSet<MapTile, MapTileQueryProxy>(MapTile, null);
		}
	};
}
			
export class MovementQueryProxy extends QueryProxy {
	get player(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get driving(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get playerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get time(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get x(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get y(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Movement extends Entity<MovementQueryProxy> {
	get player(): Partial<ForeignReference<Player>> { return this.$player; }
	driving: boolean;
	declare id: string;
	playerId: string;
	time: Date;
	x: number;
	y: number;
	
	$$meta = {
		source: "movement",
		columns: {
			driving: { type: "bool", name: "driving" },
			id: { type: "uuid", name: "id" },
			playerId: { type: "uuid", name: "player_id" },
			time: { type: "timestamp", name: "time" },
			x: { type: "float4", name: "x" },
			y: { type: "float4", name: "y" }
		},
		get set(): DbSet<Movement, MovementQueryProxy> { 
			return new DbSet<Movement, MovementQueryProxy>(Movement, null);
		}
	};
	
	constructor() {
		super();
		
		this.$player = new ForeignReference<Player>(this, "playerId", Player);
	}
	
	private $player: ForeignReference<Player>;

	set player(value: Partial<ForeignReference<Player>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.playerId = value.id as string;
		} else {
			this.playerId = null;
		}
	}

	
}
			
export class PlayerQueryProxy extends QueryProxy {
	get gameUuid(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get online(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get username(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get x(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get y(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Player extends Entity<PlayerQueryProxy> {
	companies: PrimaryReference<Company, CompanyQueryProxy>;
		properties: PrimaryReference<Property, PropertyQueryProxy>;
		movements: PrimaryReference<Movement, MovementQueryProxy>;
		gameUuid: string;
	declare id: string;
	online: boolean;
	username: string;
	x: number;
	y: number;
	
	$$meta = {
		source: "player",
		columns: {
			gameUuid: { type: "text", name: "game_uuid" },
			id: { type: "uuid", name: "id" },
			online: { type: "bool", name: "online" },
			username: { type: "text", name: "username" },
			x: { type: "float4", name: "x" },
			y: { type: "float4", name: "y" }
		},
		get set(): DbSet<Player, PlayerQueryProxy> { 
			return new DbSet<Player, PlayerQueryProxy>(Player, null);
		}
	};
	
	constructor() {
		super();
		
		this.companies = new PrimaryReference<Company, CompanyQueryProxy>(this, "ownerId", Company);
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "ownerId", Property);
		this.movements = new PrimaryReference<Movement, MovementQueryProxy>(this, "playerId", Movement);
	}
}
			
export class PropertyQueryProxy extends QueryProxy {
	get borough(): Partial<BoroughQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingGrade(): Partial<HistoricListingGradeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get owner(): Partial<PlayerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get type(): Partial<PropertyTypeQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boroughId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingGradeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingRegisteredAt(): Partial<QueryDate> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ownerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get typeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Property extends Entity<PropertyQueryProxy> {
	get borough(): Partial<ForeignReference<Borough>> { return this.$borough; }
	get historicListingGrade(): Partial<ForeignReference<HistoricListingGrade>> { return this.$historicListingGrade; }
	get owner(): Partial<ForeignReference<Player>> { return this.$owner; }
	dwellings: PrimaryReference<Dwelling, DwellingQueryProxy>;
		historicListingModifiers: PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
		get type(): Partial<ForeignReference<PropertyType>> { return this.$type; }
	boroughId: string;
	bounds: string;
	code: string;
	historicListingGradeId: string;
	historicListingRegisteredAt: Date;
	declare id: string;
	name: string;
	ownerId: string;
	typeId: string;
	
	$$meta = {
		source: "property",
		columns: {
			boroughId: { type: "uuid", name: "borough_id" },
			bounds: { type: "text", name: "bounds" },
			code: { type: "text", name: "code" },
			historicListingGradeId: { type: "uuid", name: "historic_listing_grade_id" },
			historicListingRegisteredAt: { type: "date", name: "historic_listing_registered_at" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			ownerId: { type: "uuid", name: "owner_id" },
			typeId: { type: "uuid", name: "type_id" }
		},
		get set(): DbSet<Property, PropertyQueryProxy> { 
			return new DbSet<Property, PropertyQueryProxy>(Property, null);
		}
	};
	
	constructor() {
		super();
		
		this.$borough = new ForeignReference<Borough>(this, "boroughId", Borough);
	this.$historicListingGrade = new ForeignReference<HistoricListingGrade>(this, "historicListingGradeId", HistoricListingGrade);
	this.$owner = new ForeignReference<Player>(this, "ownerId", Player);
	this.dwellings = new PrimaryReference<Dwelling, DwellingQueryProxy>(this, "propertyId", Dwelling);
		this.historicListingModifiers = new PrimaryReference<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(this, "propertyId", PropertyHistoricListingModifier);
		this.$type = new ForeignReference<PropertyType>(this, "typeId", PropertyType);
	}
	
	private $borough: ForeignReference<Borough>;

	set borough(value: Partial<ForeignReference<Borough>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.boroughId = value.id as string;
		} else {
			this.boroughId = null;
		}
	}

	private $historicListingGrade: ForeignReference<HistoricListingGrade>;

	set historicListingGrade(value: Partial<ForeignReference<HistoricListingGrade>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.historicListingGradeId = value.id as string;
		} else {
			this.historicListingGradeId = null;
		}
	}

	private $owner: ForeignReference<Player>;

	set owner(value: Partial<ForeignReference<Player>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.ownerId = value.id as string;
		} else {
			this.ownerId = null;
		}
	}

	private $type: ForeignReference<PropertyType>;

	set type(value: Partial<ForeignReference<PropertyType>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.typeId = value.id as string;
		} else {
			this.typeId = null;
		}
	}

	
}
			
export class PropertyHistoricListingModifierQueryProxy extends QueryProxy {
	get historicListingModifier(): Partial<HistoricListingModifierQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get property(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get historicListingModifierId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get propertyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class PropertyHistoricListingModifier extends Entity<PropertyHistoricListingModifierQueryProxy> {
	get historicListingModifier(): Partial<ForeignReference<HistoricListingModifier>> { return this.$historicListingModifier; }
	get property(): Partial<ForeignReference<Property>> { return this.$property; }
	historicListingModifierId: string;
	declare id: string;
	propertyId: string;
	
	$$meta = {
		source: "property_historic_listing_modifier",
		columns: {
			historicListingModifierId: { type: "uuid", name: "historic_listing_modifier_id" },
			id: { type: "uuid", name: "id" },
			propertyId: { type: "uuid", name: "property_id" }
		},
		get set(): DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy> { 
			return new DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(PropertyHistoricListingModifier, null);
		}
	};
	
	constructor() {
		super();
		
		this.$historicListingModifier = new ForeignReference<HistoricListingModifier>(this, "historicListingModifierId", HistoricListingModifier);
	this.$property = new ForeignReference<Property>(this, "propertyId", Property);
	}
	
	private $historicListingModifier: ForeignReference<HistoricListingModifier>;

	set historicListingModifier(value: Partial<ForeignReference<HistoricListingModifier>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.historicListingModifierId = value.id as string;
		} else {
			this.historicListingModifierId = null;
		}
	}

	private $property: ForeignReference<Property>;

	set property(value: Partial<ForeignReference<Property>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.propertyId = value.id as string;
		} else {
			this.propertyId = null;
		}
	}

	
}
			
export class PropertyTypeQueryProxy extends QueryProxy {
	get code(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class PropertyType extends Entity<PropertyTypeQueryProxy> {
	properties: PrimaryReference<Property, PropertyQueryProxy>;
		code: string;
	color: string;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "property_type",
		columns: {
			code: { type: "text", name: "code" },
			color: { type: "text", name: "color" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<PropertyType, PropertyTypeQueryProxy> { 
			return new DbSet<PropertyType, PropertyTypeQueryProxy>(PropertyType, null);
		}
	};
	
	constructor() {
		super();
		
		this.properties = new PrimaryReference<Property, PropertyQueryProxy>(this, "typeId", Property);
	}
}
			
export class PublicationQueryProxy extends QueryProxy {
	get mainOffice(): Partial<PropertyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get description(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get incorporation(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get legalName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mainOfficeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get tag(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Publication extends Entity<PublicationQueryProxy> {
	get mainOffice(): Partial<ForeignReference<Property>> { return this.$mainOffice; }
	articles: PrimaryReference<Article, ArticleQueryProxy>;
		description: string;
	declare id: string;
	incorporation: Date;
	legalName: string;
	mainOfficeId: string;
	name: string;
	tag: string;
	
	$$meta = {
		source: "publication",
		columns: {
			description: { type: "text", name: "description" },
			id: { type: "uuid", name: "id" },
			incorporation: { type: "timestamp", name: "incorporation" },
			legalName: { type: "text", name: "legal_name" },
			mainOfficeId: { type: "uuid", name: "main_office_id" },
			name: { type: "text", name: "name" },
			tag: { type: "text", name: "tag" }
		},
		get set(): DbSet<Publication, PublicationQueryProxy> { 
			return new DbSet<Publication, PublicationQueryProxy>(Publication, null);
		}
	};
	
	constructor() {
		super();
		
		this.$mainOffice = new ForeignReference<Property>(this, "mainOfficeId", Property);
	this.articles = new PrimaryReference<Article, ArticleQueryProxy>(this, "publicationId", Article);
	}
	
	private $mainOffice: ForeignReference<Property>;

	set mainOffice(value: Partial<ForeignReference<Property>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.mainOfficeId = value.id as string;
		} else {
			this.mainOfficeId = null;
		}
	}

	
}
			
export class ResidentQueryProxy extends QueryProxy {
	get mainTenancy(): Partial<TenancyQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get biography(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get birthday(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get familyName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get givenName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mainTenancyId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Resident extends Entity<ResidentQueryProxy> {
	tenancies: PrimaryReference<Tenancy, TenancyQueryProxy>;
		get mainTenancy(): Partial<ForeignReference<Tenancy>> { return this.$mainTenancy; }
	biography: string;
	birthday: Date;
	familyName: string;
	givenName: string;
	declare id: string;
	mainTenancyId: string;
	
	$$meta = {
		source: "resident",
		columns: {
			biography: { type: "text", name: "biography" },
			birthday: { type: "timestamp", name: "birthday" },
			familyName: { type: "text", name: "family_name" },
			givenName: { type: "text", name: "given_name" },
			id: { type: "uuid", name: "id" },
			mainTenancyId: { type: "uuid", name: "main_tenancy_id" }
		},
		get set(): DbSet<Resident, ResidentQueryProxy> { 
			return new DbSet<Resident, ResidentQueryProxy>(Resident, null);
		}
	};
	
	constructor() {
		super();
		
		this.tenancies = new PrimaryReference<Tenancy, TenancyQueryProxy>(this, "inhabitantId", Tenancy);
		this.$mainTenancy = new ForeignReference<Tenancy>(this, "mainTenancyId", Tenancy);
	}
	
	private $mainTenancy: ForeignReference<Tenancy>;

	set mainTenancy(value: Partial<ForeignReference<Tenancy>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.mainTenancyId = value.id as string;
		} else {
			this.mainTenancyId = null;
		}
	}

	
}
			
export class ResidentRelationshipQueryProxy extends QueryProxy {
	get initiator(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get peer(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bonded(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get conflict(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get connection(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get ended(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get initiatorId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get peerId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get purpose(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get summary(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class ResidentRelationship extends Entity<ResidentRelationshipQueryProxy> {
	get initiator(): Partial<ForeignReference<Resident>> { return this.$initiator; }
	get peer(): Partial<ForeignReference<Resident>> { return this.$peer; }
	bonded: Date;
	conflict: string;
	connection: string;
	ended: Date;
	declare id: string;
	initiatorId: string;
	peerId: string;
	purpose: string;
	summary: string;
	
	$$meta = {
		source: "resident_relationship",
		columns: {
			bonded: { type: "timestamp", name: "bonded" },
			conflict: { type: "text", name: "conflict" },
			connection: { type: "text", name: "connection" },
			ended: { type: "timestamp", name: "ended" },
			id: { type: "uuid", name: "id" },
			initiatorId: { type: "uuid", name: "initiator_id" },
			peerId: { type: "uuid", name: "peer_id" },
			purpose: { type: "text", name: "purpose" },
			summary: { type: "text", name: "summary" }
		},
		get set(): DbSet<ResidentRelationship, ResidentRelationshipQueryProxy> { 
			return new DbSet<ResidentRelationship, ResidentRelationshipQueryProxy>(ResidentRelationship, null);
		}
	};
	
	constructor() {
		super();
		
		this.$initiator = new ForeignReference<Resident>(this, "initiatorId", Resident);
	this.$peer = new ForeignReference<Resident>(this, "peerId", Resident);
	}
	
	private $initiator: ForeignReference<Resident>;

	set initiator(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.initiatorId = value.id as string;
		} else {
			this.initiatorId = null;
		}
	}

	private $peer: ForeignReference<Resident>;

	set peer(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.peerId = value.id as string;
		} else {
			this.peerId = null;
		}
	}

	
}
			
export class SquareQueryProxy extends QueryProxy {
	get borough(): Partial<BoroughQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get boroughId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Square extends Entity<SquareQueryProxy> {
	get borough(): Partial<ForeignReference<Borough>> { return this.$borough; }
	boroughId: string;
	bounds: string;
	declare id: string;
	name: string;
	
	$$meta = {
		source: "square",
		columns: {
			boroughId: { type: "uuid", name: "borough_id" },
			bounds: { type: "text", name: "bounds" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" }
		},
		get set(): DbSet<Square, SquareQueryProxy> { 
			return new DbSet<Square, SquareQueryProxy>(Square, null);
		}
	};
	
	constructor() {
		super();
		
		this.$borough = new ForeignReference<Borough>(this, "boroughId", Borough);
	}
	
	private $borough: ForeignReference<Borough>;

	set borough(value: Partial<ForeignReference<Borough>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.boroughId = value.id as string;
		} else {
			this.boroughId = null;
		}
	}

	
}
			
export class StreetQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get shortName(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get size(): Partial<QueryNumber> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Street extends Entity<StreetQueryProxy> {
	bridges: PrimaryReference<Bridge, BridgeQueryProxy>;
		declare id: string;
	name: string;
	path: string;
	shortName: string;
	size: number;
	
	$$meta = {
		source: "street",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" },
			shortName: { type: "text", name: "short_name" },
			size: { type: "float4", name: "size" }
		},
		get set(): DbSet<Street, StreetQueryProxy> { 
			return new DbSet<Street, StreetQueryProxy>(Street, null);
		}
	};
	
	constructor() {
		super();
		
		this.bridges = new PrimaryReference<Bridge, BridgeQueryProxy>(this, "streetId", Bridge);
	}
}
			
export class TenancyQueryProxy extends QueryProxy {
	get dwelling(): Partial<DwellingQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get inhabitant(): Partial<ResidentQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get dwellingId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get end(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get inhabitantId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get start(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Tenancy extends Entity<TenancyQueryProxy> {
	get dwelling(): Partial<ForeignReference<Dwelling>> { return this.$dwelling; }
	get inhabitant(): Partial<ForeignReference<Resident>> { return this.$inhabitant; }
	dwellingId: string;
	end: Date;
	declare id: string;
	inhabitantId: string;
	start: Date;
	
	$$meta = {
		source: "tenancy",
		columns: {
			dwellingId: { type: "uuid", name: "dwelling_id" },
			end: { type: "timestamp", name: "end" },
			id: { type: "uuid", name: "id" },
			inhabitantId: { type: "uuid", name: "inhabitant_id" },
			start: { type: "timestamp", name: "start" }
		},
		get set(): DbSet<Tenancy, TenancyQueryProxy> { 
			return new DbSet<Tenancy, TenancyQueryProxy>(Tenancy, null);
		}
	};
	
	constructor() {
		super();
		
		this.$dwelling = new ForeignReference<Dwelling>(this, "dwellingId", Dwelling);
	this.$inhabitant = new ForeignReference<Resident>(this, "inhabitantId", Resident);
	}
	
	private $dwelling: ForeignReference<Dwelling>;

	set dwelling(value: Partial<ForeignReference<Dwelling>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.dwellingId = value.id as string;
		} else {
			this.dwellingId = null;
		}
	}

	private $inhabitant: ForeignReference<Resident>;

	set inhabitant(value: Partial<ForeignReference<Resident>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.inhabitantId = value.id as string;
		} else {
			this.inhabitantId = null;
		}
	}

	
}
			
export class TrainRouteQueryProxy extends QueryProxy {
	get color(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get path(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainRoute extends Entity<TrainRouteQueryProxy> {
	stops: PrimaryReference<TrainStop, TrainStopQueryProxy>;
		color: string;
	declare id: string;
	name: string;
	path: string;
	
	$$meta = {
		source: "train_route",
		columns: {
			color: { type: "text", name: "color" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			path: { type: "text", name: "path" }
		},
		get set(): DbSet<TrainRoute, TrainRouteQueryProxy> { 
			return new DbSet<TrainRoute, TrainRouteQueryProxy>(TrainRoute, null);
		}
	};
	
	constructor() {
		super();
		
		this.stops = new PrimaryReference<TrainStop, TrainStopQueryProxy>(this, "routeId", TrainStop);
	}
}
			
export class TrainStationQueryProxy extends QueryProxy {
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get position(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStation extends Entity<TrainStationQueryProxy> {
	exits: PrimaryReference<TrainStationExit, TrainStationExitQueryProxy>;
		stops: PrimaryReference<TrainStop, TrainStopQueryProxy>;
		declare id: string;
	name: string;
	position: string;
	
	$$meta = {
		source: "train_station",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			position: { type: "text", name: "position" }
		},
		get set(): DbSet<TrainStation, TrainStationQueryProxy> { 
			return new DbSet<TrainStation, TrainStationQueryProxy>(TrainStation, null);
		}
	};
	
	constructor() {
		super();
		
		this.exits = new PrimaryReference<TrainStationExit, TrainStationExitQueryProxy>(this, "stationId", TrainStationExit);
		this.stops = new PrimaryReference<TrainStop, TrainStopQueryProxy>(this, "stationId", TrainStop);
	}
}
			
export class TrainStationExitQueryProxy extends QueryProxy {
	get station(): Partial<TrainStationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get inbound(): Partial<QueryBoolean> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get position(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get stationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStationExit extends Entity<TrainStationExitQueryProxy> {
	get station(): Partial<ForeignReference<TrainStation>> { return this.$station; }
	declare id: string;
	inbound: boolean;
	position: string;
	stationId: string;
	
	$$meta = {
		source: "train_station_exit",
		columns: {
			id: { type: "uuid", name: "id" },
			inbound: { type: "bool", name: "inbound" },
			position: { type: "text", name: "position" },
			stationId: { type: "uuid", name: "station_id" }
		},
		get set(): DbSet<TrainStationExit, TrainStationExitQueryProxy> { 
			return new DbSet<TrainStationExit, TrainStationExitQueryProxy>(TrainStationExit, null);
		}
	};
	
	constructor() {
		super();
		
		this.$station = new ForeignReference<TrainStation>(this, "stationId", TrainStation);
	}
	
	private $station: ForeignReference<TrainStation>;

	set station(value: Partial<ForeignReference<TrainStation>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.stationId = value.id as string;
		} else {
			this.stationId = null;
		}
	}

	
}
			
export class TrainStopQueryProxy extends QueryProxy {
	get route(): Partial<TrainRouteQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get station(): Partial<TrainStationQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get routeId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get stationId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get trackPosition(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class TrainStop extends Entity<TrainStopQueryProxy> {
	get route(): Partial<ForeignReference<TrainRoute>> { return this.$route; }
	get station(): Partial<ForeignReference<TrainStation>> { return this.$station; }
	declare id: string;
	name: string;
	routeId: string;
	stationId: string;
	trackPosition: string;
	
	$$meta = {
		source: "train_stop",
		columns: {
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			routeId: { type: "uuid", name: "route_id" },
			stationId: { type: "uuid", name: "station_id" },
			trackPosition: { type: "text", name: "track_position" }
		},
		get set(): DbSet<TrainStop, TrainStopQueryProxy> { 
			return new DbSet<TrainStop, TrainStopQueryProxy>(TrainStop, null);
		}
	};
	
	constructor() {
		super();
		
		this.$route = new ForeignReference<TrainRoute>(this, "routeId", TrainRoute);
	this.$station = new ForeignReference<TrainStation>(this, "stationId", TrainStation);
	}
	
	private $route: ForeignReference<TrainRoute>;

	set route(value: Partial<ForeignReference<TrainRoute>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.routeId = value.id as string;
		} else {
			this.routeId = null;
		}
	}

	private $station: ForeignReference<TrainStation>;

	set station(value: Partial<ForeignReference<TrainStation>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.stationId = value.id as string;
		} else {
			this.stationId = null;
		}
	}

	
}
			
export class WaterBodyQueryProxy extends QueryProxy {
	get bounds(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get name(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get namePath(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class WaterBody extends Entity<WaterBodyQueryProxy> {
	bounds: string;
	declare id: string;
	name: string;
	namePath: string;
	
	$$meta = {
		source: "water_body",
		columns: {
			bounds: { type: "text", name: "bounds" },
			id: { type: "uuid", name: "id" },
			name: { type: "text", name: "name" },
			namePath: { type: "text", name: "name_path" }
		},
		get set(): DbSet<WaterBody, WaterBodyQueryProxy> { 
			return new DbSet<WaterBody, WaterBodyQueryProxy>(WaterBody, null);
		}
	};
}
			

export class DbContext {
	article: DbSet<Article, ArticleQueryProxy>;
	articleImage: DbSet<ArticleImage, ArticleImageQueryProxy>;
	borough: DbSet<Borough, BoroughQueryProxy>;
	bridge: DbSet<Bridge, BridgeQueryProxy>;
	company: DbSet<Company, CompanyQueryProxy>;
	dwelling: DbSet<Dwelling, DwellingQueryProxy>;
	historicListingGrade: DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>;
	historicListingModifier: DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>;
	mapTile: DbSet<MapTile, MapTileQueryProxy>;
	movement: DbSet<Movement, MovementQueryProxy>;
	player: DbSet<Player, PlayerQueryProxy>;
	property: DbSet<Property, PropertyQueryProxy>;
	propertyHistoricListingModifier: DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>;
	propertyType: DbSet<PropertyType, PropertyTypeQueryProxy>;
	publication: DbSet<Publication, PublicationQueryProxy>;
	resident: DbSet<Resident, ResidentQueryProxy>;
	residentRelationship: DbSet<ResidentRelationship, ResidentRelationshipQueryProxy>;
	square: DbSet<Square, SquareQueryProxy>;
	street: DbSet<Street, StreetQueryProxy>;
	tenancy: DbSet<Tenancy, TenancyQueryProxy>;
	trainRoute: DbSet<TrainRoute, TrainRouteQueryProxy>;
	trainStation: DbSet<TrainStation, TrainStationQueryProxy>;
	trainStationExit: DbSet<TrainStationExit, TrainStationExitQueryProxy>;
	trainStop: DbSet<TrainStop, TrainStopQueryProxy>;
	waterBody: DbSet<WaterBody, WaterBodyQueryProxy>;

	constructor(private runContext: RunContext) {
		this.article = new DbSet<Article, ArticleQueryProxy>(Article, this.runContext);
		this.articleImage = new DbSet<ArticleImage, ArticleImageQueryProxy>(ArticleImage, this.runContext);
		this.borough = new DbSet<Borough, BoroughQueryProxy>(Borough, this.runContext);
		this.bridge = new DbSet<Bridge, BridgeQueryProxy>(Bridge, this.runContext);
		this.company = new DbSet<Company, CompanyQueryProxy>(Company, this.runContext);
		this.dwelling = new DbSet<Dwelling, DwellingQueryProxy>(Dwelling, this.runContext);
		this.historicListingGrade = new DbSet<HistoricListingGrade, HistoricListingGradeQueryProxy>(HistoricListingGrade, this.runContext);
		this.historicListingModifier = new DbSet<HistoricListingModifier, HistoricListingModifierQueryProxy>(HistoricListingModifier, this.runContext);
		this.mapTile = new DbSet<MapTile, MapTileQueryProxy>(MapTile, this.runContext);
		this.movement = new DbSet<Movement, MovementQueryProxy>(Movement, this.runContext);
		this.player = new DbSet<Player, PlayerQueryProxy>(Player, this.runContext);
		this.property = new DbSet<Property, PropertyQueryProxy>(Property, this.runContext);
		this.propertyHistoricListingModifier = new DbSet<PropertyHistoricListingModifier, PropertyHistoricListingModifierQueryProxy>(PropertyHistoricListingModifier, this.runContext);
		this.propertyType = new DbSet<PropertyType, PropertyTypeQueryProxy>(PropertyType, this.runContext);
		this.publication = new DbSet<Publication, PublicationQueryProxy>(Publication, this.runContext);
		this.resident = new DbSet<Resident, ResidentQueryProxy>(Resident, this.runContext);
		this.residentRelationship = new DbSet<ResidentRelationship, ResidentRelationshipQueryProxy>(ResidentRelationship, this.runContext);
		this.square = new DbSet<Square, SquareQueryProxy>(Square, this.runContext);
		this.street = new DbSet<Street, StreetQueryProxy>(Street, this.runContext);
		this.tenancy = new DbSet<Tenancy, TenancyQueryProxy>(Tenancy, this.runContext);
		this.trainRoute = new DbSet<TrainRoute, TrainRouteQueryProxy>(TrainRoute, this.runContext);
		this.trainStation = new DbSet<TrainStation, TrainStationQueryProxy>(TrainStation, this.runContext);
		this.trainStationExit = new DbSet<TrainStationExit, TrainStationExitQueryProxy>(TrainStationExit, this.runContext);
		this.trainStop = new DbSet<TrainStop, TrainStopQueryProxy>(TrainStop, this.runContext);
		this.waterBody = new DbSet<WaterBody, WaterBodyQueryProxy>(WaterBody, this.runContext);
	}

	findSet(modelType) {
		for (let key in this) {
			if (this[key] instanceof DbSet) {
				if ((this[key] as any).modelConstructor == modelType) {
					return this[key];
				}
			}
		}
	}

	
};