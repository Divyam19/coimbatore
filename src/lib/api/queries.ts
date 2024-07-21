import { getUserAuth } from "../auth/utils";

export async function getsellerdata(){
    const {session}=await getUserAuth();
    const sellerid=session?.user.id;
    const email=session?.user.email;
    const mobno=db?.seller.findUnique({where:{id:sellerid}}).mobno
    const city=db?.seller.findUnique({where:{id:sellerid}}).city
    const country=db?.seller.findUnique({where:{id:sellerid}}).country
    const state=db?.seller.findUnique({where:{id:sellerid}}).state
    return {sellerdata:{sellerid,email,mobno,city,country,state}}
}