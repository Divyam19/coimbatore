import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { getUserAuth } from '@/lib/auth/utils'
import { Button } from '@/components/ui/button'
  
const AddProduct = async () => {
    const options=[
        {value:'not-selected',label:'Not-selected'},
        {value:'hydro',label:'Hydro Electricity'},
        {value:'solar',label:'Solar Electricity'},
        {value:'wind',label:'Wind Electricity'},
        {value:'geothermal',label:'Geothermal Energy'},
        {value:'bio',label:'Biomass Energy'},
        {value:'ocean',label:'Ocean Energy'},
        {value:'hydrogen energy',label:'hydrogen Energy'},
    ]
    const {session}=await getUserAuth();
    const sellerid=session?.user.id;
    const email=session?.user.email
    return (
        
    <Dialog >
        <DialogTrigger className='bg-red-500 hover:bg-red-600 p-2 rounded-xl'>Add Product</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Add a new Product</DialogTitle>
            <DialogDescription>
                <form action={'/api/addproduct'} method='POST'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Product</CardTitle>
                            <CardDescription>AddnNew Product Details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <Label>Product Name</Label>
                                    <Input type='text' placeholder='Product name'  name='name' required/>
                                </div>
                                <div>
                                    <Label>Type</Label>
                                    <select id='energyType' name='type'>
                                        {
                                            options.map((option)=>(
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <Label>Product description</Label>
                                    <Input type='text' size={50} placeholder='describe your product in less than 50 words' name='description' required />
                                </div>
                                <Input type='hidden' name='sellerid' value={sellerid}/>
                                <Input type='hidden' name='email' value={email}/>
                                <div>
                                    <Label>Product price</Label>
                                    <Input type='number' size={50} placeholder='Enter product price in INR' required name='price'/>
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
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>

  )
}

export default AddProduct