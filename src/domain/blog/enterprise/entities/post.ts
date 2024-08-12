import { Entity } from "@/core/entity";

interface PostProps {
  title: string;
  content: string;
  authorId: string;
  communityId: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Post extends Entity<PostProps> {
  get title() {
    return this.props.title;
  }
  get content() {
    return this.props.content;
  }
  get authorId() {
    return this.props.authorId;
  }
  get communityId() {
    return this.props.communityId;
  }
  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Omit<PostProps, "createdAt" | "updatedAt">,
    id?: string
  ) {
    const post = new Post(
      {
        authorId: props.authorId,
        communityId: props.communityId,
        content: props.content,
        createdAt: new Date(),
        title: props.title,
        updatedAt: null,
      },
      id
    );

    return post;
  }
}
