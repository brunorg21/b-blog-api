import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().max(500).min(15),
  topics: z.array(z.string()).default([]).optional(),
  bloggerCommunityId: z.string().nullable(),
  title: z.string(),
});

export const updatePostSchema = z.object({
  content: z.string().max(500).min(15),
  topics: z.array(z.string()),
  title: z.string(),
});

export const paramsPostSchema = z.object({
  id: z.string(),
});

export const queryPostSchema = z.object({
  page: z.number().default(10).optional(),
});
