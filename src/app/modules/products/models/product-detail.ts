export class ProductDetail {
  code: string;
  name: string;
  price: number;
  imageURL: string;
  description: string;
  presentations: Presentation[];
}

export interface Presentation {
  code: string;
  name: string;
  pesoKg: number;
  stock: number;
}