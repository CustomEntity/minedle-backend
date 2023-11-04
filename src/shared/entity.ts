export abstract class Entity<D> {
  protected readonly _data: D;

  constructor(data: D) {
    this._data = data;
  }

  get data(): D {
    return this._data;
  }
}
