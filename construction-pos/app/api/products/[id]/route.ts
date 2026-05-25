import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, sku, categoryId, price, cost, markup, quantity, barcode, image, price1, price2, price3 } = body;

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        sku,
        categoryId,
        price: parseFloat(price),
        cost: parseFloat(cost),
        markup: markup ? parseFloat(markup) : 0,
        quantity: parseInt(quantity),
        barcode,
        image,
        price1: price1 ? parseFloat(price1) : null,
        price2: price2 ? parseFloat(price2) : null,
        price3: price3 ? parseFloat(price3) : null,
      },
      include: { category: true },
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
