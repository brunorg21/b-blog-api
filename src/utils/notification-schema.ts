import { z } from "zod";

export const deleteNotificationSchema = z.object({
  id: z.string(),
})