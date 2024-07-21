import { authOptions, getUserAuth } from "@/lib/auth/utils";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { getSession } from "next-auth/react";

export async function POST(req:Request) {
    // const {session}=await getUserAuth();
    const data=await req.formData()
    const city = data.get("city") as string;
    console.log('city')
    const country=data.get("country") as string;
    const name=data.get("name") as string;
    const id=data.get('id') as string;
    const email=data.get('email') as string;
    const mobno=data.get('mobno') as string;
    const state=data.get('state') as string;
    console.log(city,country,name,id,email,mobno,state)
    
    try{
        const seller=await db.seller.create({
            data:{
                test:"",
                name:name,
                city:city,
                country:country,
                id:id,
                email:email,
                mobno:mobno,
                state:state,         
            }
        })

        if(!seller) return new Response("Failed to create seller",{status:500});

        
    }catch(error){

    }
}