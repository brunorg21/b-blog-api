export interface CommentDetailsProps {
  authorId: string;
  author: string;
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  likeCount: number;
}

export class CommentDetails {
  private props: CommentDetailsProps;

  constructor(props: CommentDetailsProps) {
    this.props = props;
  }
  get id() {
    return this.props.id;
  }
  get author() {
    return this.props.author;
  }

  get content() {
    return this.props.content;
  }

  get likeCount() {
    return this.props.likeCount;
  }

  get authorId() {
    return this.props.authorId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: CommentDetailsProps) {
    return new CommentDetails(props);
  }
}
