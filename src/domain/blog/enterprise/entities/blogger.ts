import { randomUUID } from "node:crypto";

interface BloggerProps {
  name: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
  role: "ADMIN" | "COMMON";
}

export class Blogger {
  private _id: string;
  private props: BloggerProps;
  constructor(props: BloggerProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get avatarUrl() {
    return this.props.avatarUrl;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  set password(password: string) {
    this.props.password = password;
  }
  set name(name: string) {
    this.props.name = name;
  }
  set email(email: string) {
    this.props.email = email;
  }
  set avatarUrl(avatarUrl: string | null) {
    this.props.avatarUrl = avatarUrl;
  }

  get role() {
    return this.props.role;
  }

  static create(
    props: Omit<BloggerProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const blogger = new Blogger(
      {
        avatarUrl: props.avatarUrl,
        email: props.email,
        name: props.name,
        password: props.password,
        createdAt: new Date(),
        updatedAt: null,
        role: props.role,
      },
      id
    );

    return blogger;
  }
}
