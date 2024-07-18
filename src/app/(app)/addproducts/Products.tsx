import React from 'react'
import {db} from '../../../lib/db'
async function findProducts(email:string){
    
  const id=""
  const seller = await db.product.findMany({
    where: {
      
    },
  });
    
}
const Products = () => {
  return (
    <div>

    </div>
  )
}

export default Products