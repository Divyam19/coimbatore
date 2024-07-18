import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { getUserAuth } from '@/lib/auth/utils'

const Modal =async () => {
    const options=[
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
    
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm'>
            <div>
                <Button><X/></Button>
                <div>
                    <form>
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Product</CardTitle>
                                <CardDescription>AddnNew Product Details</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col gap-3'>
                                    <div>
                                        <Label>Product Name</Label>
                                        <Input type='text' placeholder='Product name'  name='name' />
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
                                        <Input type='text' size={50} placeholder='describe your product in less than 50 words' name='description'/>
                                    </div>
                                    <Input type='hidden' name='sellerid' value={sellerid}/>
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
        </div>
  )
}

export default Modal