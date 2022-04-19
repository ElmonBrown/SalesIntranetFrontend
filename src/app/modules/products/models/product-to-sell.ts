import { Presentation } from "./product-detail";

export class ProductToSell {
  Code: String;
  Name: String;
  ListPrice: number;
  PresentationSelected: Presentation;
  PhotoURL: String;
  Quantity: number;
  QuantitySelected: number;

  constructor() {
    this.Code = this.Code,
    this.Name = this.Name,
    this.ListPrice = this.ListPrice,
    this.PresentationSelected = this.PresentationSelected,
    this.PhotoURL = this.PhotoURL,
    this.Quantity = this.Quantity,
    this.QuantitySelected = this.QuantitySelected
  }
}



