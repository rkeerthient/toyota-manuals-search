export interface EntityReference {
	entityId: string,
	name: string,
}

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export default interface Ce_manual {
	landingPageUrl?: string,
	slug?: string,
	description?: string,
	name: string,
	c_activeOnSearch?: boolean,
	c_carLine?: string,
	dm_directoryParents_manuals?: EntityReference[],
	dm_directoryParents_toyota_manual_final?: EntityReference[],
	c_primaryCTA?: C_primaryCTA,
	c_searchKeywords?: string[],
	c_secondaryCTA?: C_secondaryCTA,
	c_manual_file?: any,
	c_manual_url?: string,
	c_carmodel_type?: string,
	c_production_years?: string,
	c_productionDate?: string,
	c_carmodel?: string,
	photoGallery?: ComplexImage[],
	id: string,
}
