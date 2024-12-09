import { generateSlug } from "@/core/generate-slug";
import { randomUUID } from "node:crypto";

interface BloggersCommunityProps {
  name: string;
  description: string;
  avatarUrl: string | null;
  authorId: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class BloggersCommunity {
  private _id: string;
  private props: BloggersCommunityProps;

  constructor(props: BloggersCommunityProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
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

  get slug() {
    return this.props.slug;
  }

  get authorId() {
    return this.props.authorId;
  }

  set description(description: string) {
    this.props.description = description;
    this.update();
  }

  set name(name: string) {
    this.props.name = name;
    this.update();
  }

  set slug(slug: string) {
    this.props.slug = slug;
    this.update();
  }

  private update() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Omit<BloggersCommunityProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const bloggerscommunity = new BloggersCommunity(
      {
        avatarUrl: props.avatarUrl,
        createdAt: new Date(),
        description: props.description,
        name: props.name,
        slug: generateSlug(props.name, true),
        updatedAt: null,
        authorId: props.authorId,
      },
      id
    );

    return bloggerscommunity;
  }
}
