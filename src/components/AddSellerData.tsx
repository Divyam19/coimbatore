'use client'
import { Label } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Input } from './ui/input'
import { getSession, useSession } from 'next-auth/react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from './ui/button'
import { getUserAuth } from '@/lib/auth/utils'

const AddSellerData=()=>{
    const {data:session}= useSession();
    const name=session?.user.name as string
    const email=session?.user.email as string
    const id=session?.user.id as string
    console.log(email)
    const onSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        const data=new FormData(e.target as HTMLFormElement);
        const response = await fetch('/api/addsellerdata', {
            method: 'POST',
            body: data,
        });
        window.location.reload()
        if (response.ok) {
            console.log('success');
        } else {
            console.log('error');
        }
    }
    return (
        <div>
            <div>
                <form onSubmit={onSubmit} >
                    {/* <Label>{email}</Label> */}
                    <Input type='hidden' value={name} name='name'/>
                    <Input type='hidden' value={email} name='email'/>
                    <Input type='hidden' value={id} name='id'/>
                    <Card>
                        <CardHeader>
                            <CardTitle>Seller Details</CardTitle>
                            <CardDescription>Enter these details before adding products</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div>
                                    <Label>Country</Label>
                                    <Input type='text' placeholder='India' value="India" readOnly name='country' />
                                </div>
                                <div>
                                    <Label>State</Label>
                                    <Input type='text' placeholder='Enter your State'name='state'/>
                                    
                                </div>
                                <div>
                                    <Label>City</Label>
                                    <Input type='text' placeholder='Enter your city'name='city'/>
                                </div>
                                <div>
                                    <Label>Mobile Number</Label>
                                    <Input type='number' placeholder='Enter your 10 digit Mobile number'name='mobno'/>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type='submit' variant={'outline'}>Submit</Button>
                            <Button type='reset' variant={'outline'}>
                                Reset
                            </Button>
                        </CardFooter>
                    </Card>

                </form>
            </div>
        </div>
  )
}

export default AddSellerData;



// const AddSellerData = async() => {
//     const indianCities = [
//         "Agra",
//         "Ahmedabad",
//         "Aizawl",
//         "Amritsar",
//         "Anantnag",
//         "Aurangabad",
//         "Asansol",
//         "Balasore",
//         "Baramulla",
//         "Belgaum",
//         "Bengaluru (Bangalore)",
//         "Bhopal",
//         "Bhilai",
//         "Bilaspur",
//         "Bishnupur",
//         "Bokaro Steel City",
//         "Chandigarh",
//         "Champhai",
//         "Chennai (Madras)",
//         "Churachandpur",
//         "Coimbatore",
//         "Cuttack",
//         "Darbhanga",
//         "Dehradun",
//         "Dhanbad",
//         "Dibrugarh",
//         "Durg",
//         "Durgapur",
//         "Faridabad",
//         "Gaya",
//         "Gandhinagar",
//         "Guntur",
//         "Gwalior",
//         "Gurgaon",
//         "Hisar",
//         "Howrah",
//         "Hubli-Dharwad",
//         "Hyderabad",
//         "Imphal",
//         "Indore",
//         "Itanagar",
//         "Jabalpur",
//         "Jaipur",
//         "Jalandhar",
//         "Jammu",
//         "Jamshedpur",
//         "Jorhat",
//         "Jowai",
//         "Kakching",
//         "Kanpur",
//         "Karimnagar",
//         "Kargil",
//         "Kochi",
//         "Kohima",
//         "Kollam",
//         "Kottayam",
//         "Kurnool",
//         "Kolkata (Calcutta)",
//         "Leh",
//         "Ludhiana",
//         "Lucknow",
//         "Madurai",
//         "Mangalore",
//         "Mapusa",
//         "Margao",
//         "Mangan",
//         "Meerut",
//         "Mokokchung",
//         "Moradabad",
//         "Muzaffarpur",
//         "Mysore",
//         "Nagpur",
//         "Nainital",
//         "Nashik",
//         "Naharlagun",
//         "Noida",
//         "Nonghthymmai",
//         "Ooty",
//         "Panaji",
//         "Panipat",
//         "Pasighat",
//         "Patna",
//         "Patiala",
//         "Pune",
//         "Puri",
//         "Raipur",
//         "Rajkot",
//         "Ramagundam",
//         "Ranchi",
//         "Rishikesh",
//         "Rohtak",
//         "Rourkela",
//         "Salem",
//         "Sambalpur",
//         "Serchhip",
//         "Shillong",
//         "Shimla",
//         "Siliguri",
//         "Silchar",
//         "Sonipat",
//         "Soreng",
//         "Srinagar",
//         "Surat",
//         "Tezu",
//         "Thanjavur",
//         "Thiruvananthapuram",
//         "Thoubal",
//         "Tiruchirappalli",
//         "Tirupati",
//         "Tiruvalla",
//         "Tura",
//         "Udaipur (Rajasthan)",
//         "Udaipur (Tripura)",
//         "Ujjain",
//         "Vadodara",
//         "Varanasi",
//         "Vasco da Gama",
//         "Vijayawada",
//         "Visakhapatnam",
//         "Warangal",
//         "Wokha",
//         "Williamnagar",
//         "Ziro",
//         "Zunheboto"
//       ];