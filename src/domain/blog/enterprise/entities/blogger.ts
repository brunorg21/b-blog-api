import { randomUUID } from "node:crypto";

interface BloggerProps {
  name: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  bloggersCommunityId: string | null;
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

  get bloggersCommunityId() {
    return this.props.bloggersCommunityId;
  }

  static create(props: BloggerProps, id?: string) {
    const blogger = new Blogger(
      {
        avatarUrl: props.avatarUrl,
        bloggersCommunityId: props.bloggersCommunityId,
        email: props.email,
        name: props.name,
        password: props.password,
      },
      id
    );

    return blogger;
  }
}
