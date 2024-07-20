"use server"
import { Product } from "@prisma/client";

export async function findProducts(email:string):Promise<Product[]>{
    const products = await db!.product.findMany({
      where: {
        email:email,
      },
    })
    // console.log(products)
      return products;
  }