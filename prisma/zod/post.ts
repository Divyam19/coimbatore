import * as z from "zod"
import { CompleteSeller, relatedSellerSchema } from "./index"

export const postSchema = z.object({
  id: z.string(),
  sellerId: z.string(),
  title: z.string(),
  description: z.string(),
  email: z.string(),
  image: z.string().nullish(),
})

export interface CompletePost extends z.infer<typeof postSchema> {
  seller: CompleteSeller
}

/**
 * relatedPostSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPostSchema: z.ZodSchema<CompletePost> = z.lazy(() => postSchema.extend({
  seller: relatedSellerSchema,
}))
