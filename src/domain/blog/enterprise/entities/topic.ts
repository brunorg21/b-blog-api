import { randomUUID } from "node:crypto";

interface TopicProps {
  name: string;
  slug: string;
}

export class Topic {
  private _id: string;

  constructor(private props: TopicProps, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  get slug() {
    return this.props.slug;
  }

  static create(props: TopicProps, id?: string) {
    const topic = new Topic(
      {
        name: props.name,
        slug: props.slug,
      },
      id
    );

    return topic;
  }
}
