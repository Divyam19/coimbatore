'use client'
import React, { useEffect, useState } from 'react'
import { findProducts } from '@/actions/action';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// helllloooo
interface Product {
  id: string;
  name: string;
  type: string;
  description: string | null;
  sellerId: string;
  price: number;
  email: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const email = session?.user?.email;
        if (email) {
          const fetchedProducts = await findProducts(email);
          setProducts(fetchedProducts);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div>
      {isLoading && <p>Loading products...</p>}
      {error && <p>Error: {error.message}</p>}
      {products.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {products.map((product: Product) => (
            <Card key={product.id} className='w-full h-64 bg-gradient-to-r from-black animate-gradient-x via-green-400  font-bold '>
              <CardHeader>
                <CardTitle className='pb-2'>{product.name}</CardTitle>
                
                <CardDescription className='text-black'>{product.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
                <p>Rs. {product.price}./</p>
              </CardContent>
              <CardFooter>
                <p>{product.output}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products

// import React, { ReactNode, useEffect, useState } from 'react'
// import {db} from '../../../lib/db'
// import { getUserAuth } from '@/lib/auth/utils'

// interface Product {
//   id: string;
//   name: string;
//   type: string;
//   description: string | null;
//   sellerId: string;
//   price: number;
//   email: string;
// }

// async function findProducts(email:string):Promise<ReactNode>{
//   const products = await db.product.findMany({
//     where: {
//       email:email,
//     },
//   })
//   console.log(products)
//     return products;
// }
// const Products =async  () => {
  
  

//   //use products for rendering
//   return(
//     <div>
      
//       {
//         findProducts('divyamgupta19@gmail.com')
//           .then((product)=>product?.map((item)=>{
            
//           }))
//       }
//     </div>
//   )
// }

// export default Products

