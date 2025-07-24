export class FlowerDTO {

  constructor(data:Partial<FlowerDTO>) {
    Object.assign(this, data);
  }

  id?: number|null;
  name?: string|null;
  price?: string|null;

}
