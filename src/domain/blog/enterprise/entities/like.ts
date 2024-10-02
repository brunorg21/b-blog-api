import { Entity } from "@/core/entity";

export interface LikeProps {
  authorId: string;
}

export class Like<Props extends LikeProps> extends Entity<Props> {
  get authorId() {
    return this.props.authorId;
  }
}
