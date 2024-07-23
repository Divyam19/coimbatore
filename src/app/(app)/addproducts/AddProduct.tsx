'use client'
import React, { useState, useEffect, use } from 'react'
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
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { DialogClose } from '@radix-ui/react-dialog'

const AddProduct = () => {
    const { data: session } = useSession();
    const [sellerData, setSellerData] = useState({ mobno: '', city: '', country: '', state: '' });
    const email = session?.user?.email as string
    const sellerid = session?.user?.id as string
    const [formData, setFormData] = useState({
        name: '',
        type: 'not-selected',
        description: '',
        price: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (sellerid) {
                try {
                    const response = await fetch(`/api/getSellerDetails?sellerId=${sellerid}`);
                    
                    if (response.ok) {
                        const seller = await response.json();
                        setSellerData(seller);
                    } else {
                        console.error('Failed to fetch seller data');
                    }
                } catch (error) {
                    console.error('Error fetching seller data:', error);
                }
            }
        }
        fetchData();
    }, [sellerid]);
    
    const options = [
        {value:'not-selected',label:'Not-selected'},
        {value:'hydro',label:'Hydro Electricity'},
        {value:'solar',label:'Solar Electricity'},
        {value:'wind',label:'Wind Electricity'},
        {value:'geothermal',label:'Geothermal Energy'},
        {value:'bio',label:'Biomass Energy'},
        {value:'ocean',label:'Ocean Energy'},
        {value:'hydrogen energy',label:'hydrogen Energy'},
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData(e.target as HTMLFormElement);
        
        

        try {
            const response = await fetch('/api/addproduct', {
                method: 'POST',
                body: formDataToSend,
            });
            window.location.reload()
            if (response.ok) {
                console.log('success');
                // window.location.reload();
            } else {
                console.log('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className='bg-red-500 hover:bg-red-600 p-2 rounded-xl'>Add Product</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new Product</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={onSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add Product</CardTitle>
                                    
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-col '>
                                        <div>
                                            <Label>Product Name</Label>
                                            <Input type='text' placeholder='Product name' name='name' required   />
                                        </div>
                                        <div>
                                            <Label>Type</Label>
                                            <select id='energyType' name='type' value={formData.type} >
                                                {options.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label>Product description</Label>
                                            <Input type='text' size={50} placeholder='describe your product in less than 50 words' name='description' required   />
                                        </div>
                                        <div>
                                            <Label>Product price</Label>
                                            <Input type='number' size={50} placeholder='Enter product price in INR' required name='price'   />
                                        </div>
                                        <div>
                                            <Label>Energy Output</Label>
                                            <Input type='text'  placeholder='Enter the energy output in Kw,joules or required unit' required name='output'   />
                                        </div>
                                        <div>
                                            <Label>City</Label>
                                            <Input type='text'  placeholder='Enter the city' required name='city'   />
                                        </div>
                                        <div>
                                            <Label>Country</Label>
                                            <Input type='text'  placeholder='country' required name='country' value='India' readOnly   />
                                        </div>
                                        <div>
                                            <Label>State</Label>
                                            <Input type='text'  placeholder='Enter the state' required name='state'   />
                                        </div>
                                        <div>
                                            <Label>Mobile No</Label>
                                            <Input type='text'  placeholder='Enter mobile no' required name='mobno'   />
                                        </div>
                                        
                                        
                                        <div>
                                            {/* <Input type='hidden' name='mobno' value={sellerData.mobno} />
                                            <Input type='hidden' name='city' value={sellerData.city} />
                                            <Input type='hidden' name='country' value={sellerData.country} />
                                            <Input type='hidden' name='state' value={sellerData.state} />*/}
                                            <Input type='hidden' name='email' value={email} /> 
                                            <Input type='hidden' name='sellerid' value={sellerid} />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <DialogClose asChild>
                                        <Button type='submit' variant={'outline'}>Submit</Button>
                                    </DialogClose>
                                    <Button type='reset' variant={'outline'} onClick={() => setFormData({ name: '', type: 'not-selected', description: '', price: '' })}>
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
// 'use client'
// import { Label } from '@radix-ui/react-dropdown-menu'
// import React, { useState } from 'react'

// import { useSession } from 'next-auth/react'
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
// import { DialogHeader } from '@/components/ui/dialog'


// const AddSellerData = () => {
//     const { data: session } = useSession();
//     const name = session?.user?.name as string
//     const email = session?.user?.email as string
//     const sellerid = session?.user?.id as string

//     const [formData, setFormData] = useState({
//         state: '',
//         city: '',
//         mobno: ''
//     });

//     const options = [
//         {value:'not-selected',label:'Not-selected'},
//         {value:'hydro',label:'Hydro Electricity'},
//         {value:'solar',label:'Solar Electricity'},
//         {value:'wind',label:'Wind Electricity'},
//         {value:'geothermal',label:'Geothermal Energy'},
//         {value:'bio',label:'Biomass Energy'},
//         {value:'ocean',label:'Ocean Energy'},
//         {value:'hydrogen energy',label:'hydrogen Energy'},
//     ]

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const data = new FormData();
//         data.append('name', name);
//         data.append('email', email);
//         data.append('sellerid', sellerid);
//         data.append('country', 'India');
//         Object.entries(formData).forEach(([key, value]) => {
//             data.append(key, value);
//         });

//         try {
//             const response = await fetch('/api/addsellerdata', {
//                 method: 'POST',
//                 body: data,
//             });

//             if (response.ok) {
//                 console.log('success');
//                 window.location.reload();
//             } else {
//                 console.log('error');
//             }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     return (
//         <Dialog>
//             <DialogTrigger className='bg-red-500 hover:bg-red-600 p-2 rounded-xl'>Add Product</DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Add a new Product</DialogTitle>
//                     <DialogDescription>
//                         <form onSubmit={handleSubmit}>
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Add Product</CardTitle>
//                                     <CardDescription>Add New Product Details</CardDescription>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className='flex flex-col gap-3'>
//                                         <div>
//                                             <Label>Product Name</Label>
//                                             <Input type='text' placeholder='Product name' name='name' required  onChange={handleChange} />
//                                         </div>
//                                         <div>
//                                             <Label>Type</Label>
//                                             <select id='energyType' name='type'  onChange={handleChange}>
//                                                 {options.map((option) => (
//                                                     <option key={option.value} value={option.value}>
//                                                         {option.label}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                         <div>
//                                             <Label>Product description</Label>
//                                             <Input type='text' size={50} placeholder='describe your product in less than 50 words' name='description' required  onChange={handleChange} />
//                                         </div>
//                                         <div>
//                                             <Label>Product price</Label>
//                                             <Input type='number' size={50} placeholder='Enter product price in INR' required name='price'  onChange={handleChange} />
//                                         </div>
//                                         <div>
//                                             <Label>Energy Output</Label>
//                                             <Input type='text' size={50} placeholder='Enter product energy output in joules/KW/or respective units' required name='output'  onChange={handleChange} />
//                                         </div>
//                                         <Input type='hidden' name='sellerid' value={sellerid}/>
//                                         <Input type='hidden' name='email' value={email}/>
//                                         <Input type='hidden' name='mobno' value={mobno}/>
//                                         <Input type='hidden' name='city' value={city}/>
//                                         <Input type='hidden' name='country' value={country}/>
//                                         <Input type='hidden' name='state' value={state}/>
//                                     </div>
//                                 </CardContent>
//                                 <CardFooter>
//                                 <DialogClose asChild>

//                                     <Button type='submit' variant={'outline'}>Submit</Button>
//                                 </DialogClose>
//                                     <Button type='reset' variant={'outline'} onClick={() => setFormData({ name: '', type: 'not-selected', description: '', price: '' })}>
//                                         Reset
//                                     </Button>
//                                 </CardFooter>
//                             </Card>
//                         </form>
//                     </DialogDescription>
//                 </DialogHeader>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default AddSellerData;

{/*
'use client'
import React, { useState } from 'react'
import axios from 'axios'
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
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { DialogClose } from '@radix-ui/react-dialog'

const AddProduct = () => {
    const { data: session } = useSession();
    const email=(session?.user.email) as string
    const sellerid=(session?.user.id)   as string
    const mobno=db?.seller.findUnique({where:{id:sellerid}}).mobno
    const city=db?.seller.findUnique({where:{id:sellerid}}).city
    const country=db?.seller.findUnique({where:{id:sellerid}}).country
    const state=db?.seller.findUnique({where:{id:sellerid}}).state
    const [formData, setFormData] = useState({
        name: '',
        type: 'not-selected',
        description: '',
        price: '',
    });

    const options = [
        {value:'not-selected',label:'Not-selected'},
        {value:'hydro',label:'Hydro Electricity'},
        {value:'solar',label:'Solar Electricity'},
        {value:'wind',label:'Wind Electricity'},
        {value:'geothermal',label:'Geothermal Energy'},
        {value:'bio',label:'Biomass Energy'},
        {value:'ocean',label:'Ocean Energy'},
        {value:'hydrogen energy',label:'hydrogen Energy'},
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data=new FormData(e.target as HTMLFormElement);
        const response = await fetch('/api/addproduct', {
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
        <Dialog>
            <DialogTrigger className='bg-red-500 hover:bg-red-600 p-2 rounded-xl'>Add Product</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new Product</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={onSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add Product</CardTitle>
                                    <CardDescription>Add New Product Details</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-col gap-3'>
                                        <div>
                                            <Label>Product Name</Label>
                                            <Input type='text' placeholder='Product name' name='name' required value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <Label>Type</Label>
                                            <select id='energyType' name='type' value={formData.type} onChange={handleChange}>
                                                {options.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label>Product description</Label>
                                            <Input type='text' size={50} placeholder='describe your product in less than 50 words' name='description' required value={formData.description} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <Label>Product price</Label>
                                            <Input type='number' size={50} placeholder='Enter product price in INR' required name='price' value={formData.price} onChange={handleChange} />
                                        </div>
                                        <div>
                                            <Label>Energy Output</Label>
                                            <Input type='text' size={50} placeholder='Enter product energy output in joules/KW/or respective units' required name='output' value={formData.output} onChange={handleChange} />
                                        </div>
                                        <Input type='hidden' name='sellerid' value={sellerid}/>
                                        <Input type='hidden' name='email' value={email}/>
                                        <Input type='hidden' name='mobno' value={mobno}/>
                                        <Input type='hidden' name='city' value={city}/>
                                        <Input type='hidden' name='country' value={country}/>
                                        <Input type='hidden' name='state' value={state}/>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                <DialogClose asChild>

                                    <Button type='submit' variant={'outline'}>Submit</Button>
                                </DialogClose>
                                    <Button type='reset' variant={'outline'} onClick={() => setFormData({ name: '', type: 'not-selected', description: '', price: '' })}>
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
*/}




