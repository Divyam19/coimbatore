
import AddSellerData from '@/components/AddSellerData'
import { getUserAuth } from '@/lib/auth/utils'
import AddProduct from './AddProduct';
import Products from './Products';


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
  // const [showModal, setShowModal] = useState(false)
  const {session}=await getUserAuth()
  const emailToCheck : string=session?.user.email as string;
const sellerExists =await checkSellerEmail(emailToCheck);

// if(session?.user.role === "USER"){
//   return(<div>You are not authorized to access this page.</div>)
// }

  if(sellerExists){
    return(
      <div className='my-4'>
        <h1 className="text-2xl font-semibold my-4">Add Products</h1>
        <div>
          <div >
            <AddProduct/>
          </div>
          <br/>
          <div>
            <Products/>
          </div>
        </div>
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