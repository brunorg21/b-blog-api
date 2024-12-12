import { z } from "zod";

export const createCommentSchema = z.object({
  content: z.string().max(500),
  postId: z.string(),
});
export const updateCommentSchema = z.object({
  content: z.string().max(500),
  authorId: z.string(),
});

export const paramsCommentSchema = z.object({
  id: z.string(),
});
