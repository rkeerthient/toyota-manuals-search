export interface ImageThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  url: string;
  width: number;
  height: number;
  thumbnails?: ImageThumbnail[];
  alternateText?: string;
}

export interface ComplexImage {
  image: Image;
  details?: string;
  description?: string;
  clickthroughUrl?: string;
}

export default interface Faq {
  answerV2?: any;
  landingPageUrl?: string;
  nudgeEnabled?: boolean;
  primaryConversationContact?: any;
  question: string;
  slug?: string;
  logo?: ComplexImage;
  name: string;
  c_answerMarkdown?: any;
  c_category1?: string;
  c_category2?: string;
  c_category3?: string;
  keywords?: string[];
  id: string;
  timezone?: any;
}
