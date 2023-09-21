import { z } from "zod";

export const postJSONSchema = z.object({
  title: z.string(),
  tags: z.string().transform(val => val.split(","))
});
export const postSchema = z.object({
  title: z.string(),
  tags: z.string().array().transform(val => val.join(","))
});
