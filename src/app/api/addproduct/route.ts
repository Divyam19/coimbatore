// E:\nextjs projects\coimbatore\src\app\api\addproduct\route.ts

import { NextResponse } from 'next/server';
import {db} from '@/lib/db'; // Adjust this import based on your project structure

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const mobno = formData.get('mobno') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const country = formData.get('country') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const sellerId = formData.get('sellerid') as string;
    const price = parseFloat(formData.get('price') as string);
    const email = formData.get('email') as string;
    const output = formData.get('output') as string;

    const product = await db!.product.create({
      data: {
        name,
        mobno,
        city,
        state,
        country,
        type,
        description,
        sellerId,
        price,
        email,
        output,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add product' },
      { status: 500 }
    );
  }
}