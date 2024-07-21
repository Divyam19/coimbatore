import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sellerId } = req.query;

  if (!sellerId) {
    return res.status(400).json({ error: 'Seller ID is required' });
  }

  try {
    const seller = await db?.seller.findUnique({
      where: { id: sellerId as string },
      select: { mobno: true, city: true, country: true, state: true }
    });

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    res.status(200).json(seller);
  } catch (error) {
    console.error('Error fetching seller details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}