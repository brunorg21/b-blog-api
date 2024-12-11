import { z } from "zod";

export const acceptInviteSchema = z.object({
  bloggerId: z.string(),
  bloggerCommunityId: z.string(),
});
