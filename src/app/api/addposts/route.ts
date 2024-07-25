// E:\nextjs projects\coimbatore\src\app\api\addproduct\route.ts

import { NextResponse } from 'next/server';
import {db} from '@/lib/db'; // Adjust this import based on your project structure

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const sellerid = formData.get('sellerid') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as string;
    const email = formData.get('email') as string;
    
    const product = await db!.post.create({
      data: {
        sellerid,
        title,
        description,
        email,
        image,
        seller: {
            connect: { id: `${sellerid}` } // Connect to an existing seller
            // If you
        }
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('Error adding post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add product' },
      { status: 500 }
    );
  }
}