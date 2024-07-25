import * as z from "zod"
import { CompleteProduct, relatedProductSchema, CompletePost, relatedPostSchema } from "./index"

export const sellerSchema = z.object({
  id: z.string(),
  name: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  email: z.string(),
  test: z.string().nullish(),
  mobno: z.string().nullish(),
})

export interface CompleteSeller extends z.infer<typeof sellerSchema> {
  products: CompleteProduct[]
  posts: CompletePost[]
}

/**
 * relatedSellerSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSellerSchema: z.ZodSchema<CompleteSeller> = z.lazy(() => sellerSchema.extend({
  products: relatedProductSchema.array(),
  posts: relatedPostSchema.array(),
}))
