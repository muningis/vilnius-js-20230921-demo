import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string().regex(/\d{3}/, "errors.username.must_have_digits"),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    })
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string()
  })
});