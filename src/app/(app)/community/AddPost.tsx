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

const AddPost = () => {
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
            const response = await fetch('/api/addposts', {
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
            <DialogTrigger className='bg-green-500 hover:bg-green-600 p-2 rounded-xl'>Add Product</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new Post</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={onSubmit}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Add Post</CardTitle>
                                    
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-col '>
                                        <div>
                                            <Label>Product title</Label>
                                            <Input type='text' placeholder='title' name='title' required   />
                                        </div>
                                        <div>
                                            <Label>Product description</Label>
                                            <Input type='text' size={50} placeholder='describe your product in less than 50 words' name='description' required   />
                                        </div>
                                        
                                        <div>
                                            {/* <Input type='hidden' name='mobno' value={sellerData.mobno} />
                                            <Input type='hidden' name='city' value={sellerData.city} />
                                            <Input type='hidden' name='country' value={sellerData.country} />
                                            <Input type='hidden' name='state' value={sellerData.state} />*/}
                                            <Input type='hidden' name='email' value={email} /> 
                                            <Input type='hidden' name='sellerid' value={sellerid} />
                                            <Input type='hidden' name='image' value={"image"} />
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

export default AddPost
