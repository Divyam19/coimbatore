import { authOptions, getUserAuth } from "@/lib/auth/utils";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { getSession } from "next-auth/react";

export async function POST(req:Request) {
    // const {session}=await getUserAuth();
    const data=await req.formData()
    const name = data.get("name") as string;
    // console.log('city')
    const type=data.get("type") as string;

    const description=data.get("description") as string;
    const price = parseFloat(data.get('price') as string);
    const sellerid=data.get('sellerid') as string;
    const email=data.get('email') as string;
    
    console.log(name)
    console.log(price)
    console.log(type)
    console.log(sellerid)
    console.log(description)
    console.log(email)
    
    try{
        const product=await db?.product.create({
            data:{
                name:name,
                type:type,
                description:description,
                sellerId:sellerid,
                price:price,
                email:email,
            }
        })

        if(!product) return new Response("Failed to create seller",{status:500})
    
        }catch(error){
            console.error("Error creating product:", error);
            return new Response("Internal Server Error", { status: 500 }); 
    }
}