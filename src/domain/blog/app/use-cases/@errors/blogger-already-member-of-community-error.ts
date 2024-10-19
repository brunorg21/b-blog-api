export class BloggerAlreadyMemberOfCommunityError extends Error {
  constructor(blogger: string) {
    super(`${blogger} is already a member of this community.`);
  }
}
