export class OrdersFilter {
  DateStart: string;
  DateEnd: string;
  Status: number;

  constructor() {
    this.DateStart = null;
    this.DateEnd = null;
    this.Status = null;
  }
}