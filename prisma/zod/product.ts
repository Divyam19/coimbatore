import * as z from "zod"
import { CompleteSeller, relatedSellerSchema } from "./index"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  description: z.string().nullish(),
  sellerId: z.string(),
  price: z.number().int(),
})

export interface CompleteProduct extends z.infer<typeof productSchema> {
  seller: CompleteSeller
}

/**
 * relatedProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductSchema: z.ZodSchema<CompleteProduct> = z.lazy(() => productSchema.extend({
  seller: relatedSellerSchema,
}))
