export type AttributeType = "Category" | "Style" | "Size";

export interface AttributeItem {
  _id: string;
  name: string;
  slug?: string;
  sortOrder?: number;
  isActive: boolean;
  createdAt: string;
}

export interface FormData {
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
}