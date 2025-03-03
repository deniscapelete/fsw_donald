"use server";

import { ConsumptionMethod } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderInput {
    customerName: string;
    customerCpf: string;
    products: Array<{
        id: string;
        quantity: number;
    }>;
    consumptionMethod: ConsumptionMethod;
    slug: string;
}

export const createOrder = async (Input: CreateOrderInput) => {
    const restaurant = await db.restaurant.findUnique({
        where: {
            slug: Input.slug,
        }
    })
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    const productsWithPrices = await db.product.findMany({
        where: {
            id: {
                in: Input.products.map(product => product.id)
            },
        },
    });

    const productsWhithPricesAndQuantities = Input.products.map(product => ({
        productId: product.id,
        quantity: product.quantity,
        price: productsWithPrices.find(p => p.id === product.id)!.price,
    }));

    await db.order.create({
        data: {
            status: "PENDING",
            customerName: Input.customerName,
            customerCpf: removeCpfPunctuation(Input.customerCpf),
            orderProducts: {
                createMany: {
                    data: productsWhithPricesAndQuantities,
                },
            },
            total: productsWhithPricesAndQuantities.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0,
            ),
            consumptionMethod: Input.consumptionMethod,
            restaurantId: restaurant.id,
        },
    });
    revalidatePath(`${Input.slug}/orders`);
    redirect(`/${Input.slug}/orders?cpf=${removeCpfPunctuation(Input.customerCpf)}`);
};