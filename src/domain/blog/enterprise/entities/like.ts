import { Entity } from "@/core/entity";

export interface LikeProps {
  authorId: string;
  count: number;
  createdAt: Date;
  updatedAt: Date | null;
}

export class Like<Props extends LikeProps> extends Entity<Props> {
  get authorId() {
    return this.props.authorId;
  }
  get count() {
    return this.props.count;
  }

  set count(likesCount: number) {
    this.props.count = likesCount;
  }
}
