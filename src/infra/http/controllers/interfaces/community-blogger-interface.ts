export interface UpdateBloggerRequestProps {
  bloggerId: string;
  bloggerCommunityId: string;
}

export interface CommunityBloggerControllerInterface {
  inviteBloggerToCommunity(data: UpdateBloggerRequestProps): Promise<void>;
}
