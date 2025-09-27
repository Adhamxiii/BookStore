export interface Category {
  _id: string;
  name: string;
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  isOnSale: boolean;
  discountPercent: string;
  coverImage: string;
  category: Category;
}