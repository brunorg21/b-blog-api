import { randomUUID } from "node:crypto";

interface PostTopicProps {
  postId: string;
  topicId: string;
}

export class PostTopic {
  private _id: string;
  constructor(private props: PostTopicProps, postId?: string) {
    this.props = props;
    this._id = postId ?? randomUUID();
  }

  get id() {
    return this._id;
  }
  get postId() {
    return this.props.postId;
  }
  get topicId() {
    return this.props.topicId;
  }

  static create(props: PostTopicProps, id?: string) {
    const postTopic = new PostTopic(
      {
        ...props,
      },
      id
    );

    return postTopic;
  }
}
