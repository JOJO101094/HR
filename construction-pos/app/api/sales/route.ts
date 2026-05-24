import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateSaleNumber } from '@/utils/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        saleItems: { include: { product: true } },
        customer: true,
        payment: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: sales,
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerId,
      totalAmount,
      discountAmount,
      finalAmount,
      paymentMethod,
      items,
      cashierId,
      notes,
    } = body;

    // Create sale
    const sale = await prisma.sale.create({
      data: {
        saleNumber: generateSaleNumber(),
        customerId,
        totalAmount: parseFloat(totalAmount),
        discountAmount: parseFloat(discountAmount),
        finalAmount: parseFloat(finalAmount),
        paymentMethod,
        cashierId,
        notes,
        isPaid: true,
      },
    });

    // Create sale items
    for (const item of items) {
      await prisma.saleItem.create({
        data: {
          saleId: sale.id,
          productId: item.productId,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
          discount: parseFloat(item.discount) || 0,
          subtotal: parseFloat(item.subtotal),
        },
      });

      // Update product quantity
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          quantity: { decrement: parseInt(item.quantity) },
        },
      });

      // Create inventory log
      await prisma.inventoryLog.create({
        data: {
          productId: item.productId,
          type: 'out',
          quantity: parseInt(item.quantity),
          note: `Sale ${sale.saleNumber}`,
        },
      });
    }

    // Create payment
    await prisma.payment.create({
      data: {
        saleId: sale.id,
        amount: parseFloat(finalAmount),
        method: paymentMethod,
      },
    });

    const saleWithDetails = await prisma.sale.findUnique({
      where: { id: sale.id },
      include: {
        saleItems: { include: { product: true } },
        customer: true,
        payment: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: saleWithDetails,
        message: 'Sale created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating sale:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
