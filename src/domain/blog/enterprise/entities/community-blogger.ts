import { randomUUID } from "node:crypto";

interface CommunityBloggerProps {
  bloggerId: string;
  bloggerCommunityId: string;
}

export class CommunityBlogger {
  private _id: string;
  private props: CommunityBloggerProps;

  constructor(props: CommunityBloggerProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get bloggerId() {
    return this.props.bloggerId;
  }

  get bloggerCommunityId() {
    return this.props.bloggerCommunityId;
  }

  set bloggerId(bloggerId: string) {
    this.props.bloggerId = bloggerId;
  }

  set bloggerCommunityId(bloggerCommunityId: string) {
    this.props.bloggerCommunityId = bloggerCommunityId;
  }

  static create(props: CommunityBloggerProps, id?: string) {
    const bloggerscommunity = new CommunityBlogger(
      {
        bloggerCommunityId: props.bloggerCommunityId,
        bloggerId: props.bloggerId,
      },
      id
    );

    return bloggerscommunity;
  }
}
