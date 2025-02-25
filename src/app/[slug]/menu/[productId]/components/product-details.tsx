"use client"
import { Prisma } from "@prisma/client"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image"
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDatailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                },
            },
        },
    }>;
}

export function ProductDatails({ product }: ProductDatailsProps) {

    const [quantity, SetQuantity] = useState<number>(1);

    const handleQuantityUpdate = function (value: number) {
        if (quantity === 1 && value < 0) return;
        SetQuantity(quantity + value);
    }

    return (
        <div className="relative z-50 rounded-t-3xl p-5">

            {/* RESTAURANTE */}
            <div className="flex items-center gap-1.5">
                <Image
                    src={product.restaurant.avatarImageUrl}
                    alt={product.restaurant.name}
                    width={16}
                    height={16}
                    className="rounded-full"
                />
                <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
            </div>

            {/* PRODUTO*/}
            <h2 className="text-xl font-semibold mt-1">
                {product.name}
            </h2>

            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                    {formatCurrency(product.price)}
                </h3>

                <div className="flex items-center gap-3 text-center">
                    <Button onClick={() => handleQuantityUpdate(-1)} variant={"outline"} className="h-8 w-8 rounded-xl">
                        <ChevronLeftIcon />
                    </Button>
                    <p className="w-4">{quantity}</p>
                    <Button onClick={() => handleQuantityUpdate(1)} variant={"destructive"} className="h-8 w-8 rounded-xl">
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>

        </div>
    )
}