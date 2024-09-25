import { randomUUID } from "node:crypto";

export abstract class Entity<T> {
  private _id: string;
  protected props: T;

  get id() {
    return this._id;
  }

  protected constructor(props: T, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
