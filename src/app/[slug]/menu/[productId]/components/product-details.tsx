"use client"
import { Prisma } from "@prisma/client"
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image"
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
    console.log(product.ingredients)
    const [quantity, SetQuantity] = useState<number>(1);

    const handleQuantityUpdate = function (value: number) {
        if (quantity === 1 && value < 0) return;
        SetQuantity(quantity + value);
    }

    return (
        <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col rounded-t-3xl p-5 overflow-hidden">

            <div className="flex-auto overflow-hidden">
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

                {/* PREÇO E QUANTIDADE */}
                <div className="flex items-center justify-between mt-3">
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

                <ScrollArea className="h-full">
                    {/* SOBRE */}
                    <div className="mt-6 space-y-3">
                        <h4 className="font-semibold">Sobre</h4>
                        <p className="text-sm text-muted-foreground">
                            {product.description}
                        </p>
                    </div>

                    {/* INGREDIENTS */}
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-1.5">
                            <ChefHatIcon size={18} />
                            <h4 className="font-semibold">Ingredientes</h4>
                        </div>
                        <ul className="text-muted-foreground list-disc px-5 text-sm">
                            {product.ingredients.map((ingredient) =>
                                (<li key={ingredient}>{ingredient}</li>)
                            )}
                        </ul>
                    </div>
                </ScrollArea>

            </div>

            <Button className="w-full rounded-full mt-6">Adicionar à sacola</Button>

        </div>
    )
}