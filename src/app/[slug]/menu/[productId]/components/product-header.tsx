"use client"
import { Product } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
    product: Pick<Product, "name" | "imageUrl">;
}

export function ProductHeader({ product }: ProductHeaderProps) {
    const { slug } = useParams<{ slug: string }>()
    const router = useRouter();
    const handleBackClick = function () {
        router.back()
    }
    const handleOrderClick = () => {
        router.push(`/${slug}/orders`)
    }
    return (
        <div className="relative w-full min-h-[300px]">
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 left-4 z-50 rounded-full"
                onClick={() => handleBackClick()}
            >
                <ChevronLeftIcon />
            </Button>
            <Image
                src={product.imageUrl}
                fill
                alt={product.name}
                className="object-contain"
            />
            <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-50 rounded-full"
                onClick={handleOrderClick}
            >
                <ScrollTextIcon />
            </Button>
        </div>
    )
}