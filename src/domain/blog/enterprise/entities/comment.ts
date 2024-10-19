import { Entity } from "@/core/entity";

export interface CommentProps {
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  likeCount: number;
}

export class Comment<Props extends CommentProps> extends Entity<Props> {
  get content() {
    return this.props.content;
  }
  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get likeCount() {
    return this.props.likeCount;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set likeCount(likeCount: number) {
    this.props.likeCount = likeCount;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
