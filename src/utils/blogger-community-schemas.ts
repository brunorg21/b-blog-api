import { z } from "zod";

export const createBloggerCommunitySchema = z.object({
  description: z.string(),
  name: z.string(),
  avatarUrl: z.string().nullable().default(null),
});

export const updateBloggerCommunitySchema = z.object({
  description: z.string().max(500),
  name: z.string(),
});

export const paramsBloggersCommunitySchema = z.object({
  id: z.string(),
});
export const paramsBloggersCommunityBySlugSchema = z.object({
  slug: z.string(),
  page: z.coerce.number().optional().default(1),
});

export const queryPostSchema = z.object({
  page: z.coerce.number().optional().default(1),
});
