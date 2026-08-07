export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  style: {
    _id: string;
    name: string;
  };
  sizes: Array<{
    _id: string;
    name: string;
    sortOrder: number;
  }>;
  description: string;
  price: number;
  images: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  style: string;
  sizes: string[];
  description: string;
  price: number;
  images: string[];
  stock: number;
  isActive: boolean;
}