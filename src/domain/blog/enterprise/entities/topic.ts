import { Entity } from "@/core/entity";
import { generateSlug } from "@/core/generate-slug";

export interface TopicProps {
  name: string;
  slug: string;
}

export class Topic extends Entity<TopicProps> {
  get name() {
    return this.props.name;
  }
  get slug() {
    return this.props.slug;
  }

  static create(props: TopicProps, id?: string) {
    const topic = new Topic(
      {
        ...props,
        slug: generateSlug(props.name),
      },
      id
    );
    return topic;
  }
}
