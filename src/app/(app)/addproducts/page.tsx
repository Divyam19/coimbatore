import AddSellerData from '@/components/AddSellerData'
import { getUserAuth } from '@/lib/auth/utils'
import { get } from 'http'
import React, { useState } from 'react'

async function checkSellerEmail(email:string) {

  try {
    const seller = await db?.seller.findFirst({
      where: {
        email,
      },
    });

    return seller !== null; // Return true if seller exists (not null)
  } catch (error) {
    console.error("Error checking seller email:", error);
    return false; // Return false on errors
  }
}

const AddProducts = async  () => {
  // const [registered, setRegistered] = useState(false)
  const {session}=await getUserAuth()
  const emailToCheck : string=session?.user.email as string;
  const sellerExists =await checkSellerEmail(emailToCheck);

  if(sellerExists){
    return(
      <div>
        seller exists
      </div>
    )
  }else{
    return(
      <div>
        <AddSellerData/>
      </div>
    )
  }


  
}

export default AddProducts