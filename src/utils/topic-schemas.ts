import { z } from "zod";

export const createTopicSchema = z.object({
  name: z.string().max(50),
})

export const paramsTopicSchema = z.object({
  id: z.string(),
})