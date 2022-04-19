export class Order {
  id: string;
  invoice: any;
  status: number;
  codeSAP: null;
  prefereDelivery: any;
  create: any;
  itemAmount: number;
  paymentAmount: number;
  items: Item[];

  constructor() {
    this.id = this.id;
    this.invoice = this.invoice;
    this.status = this.status;
    this.codeSAP = this.codeSAP;
    this.prefereDelivery = this.prefereDelivery;
    this.create = this.create;
    this.itemAmount = this.itemAmount;
    this.paymentAmount = this.paymentAmount;
    this.items = this.items;
  }
}

export interface Item {
  id: string;
  material: {
      name: string;
      description: string;
      presentation: {
        name: string;
        code: string;
        sizeKg: number;
      },
      category: {
        id: string;
        name: string;
      }
  },
  quantity: number;
  currency: string;
  originalPrice: number;
  discount: number;
  price: number;
  amount: number;
}