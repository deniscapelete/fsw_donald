import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import { ProductDatails } from "./components/product-details";
import { ProductHeader } from "./components/product-header";

interface ProductPageProps {
    params: Promise<{ slug: string; productId: string }>;
}
export default async function ProductPage({ params }: ProductPageProps) {
    const { slug, productId } = await params
    const product = await db.product.findUnique({
        where: { id: productId },
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true,
                },
            },
        },
    });
    if (!product) {
        return notFound();
    }
    return (
        <>
            <ProductHeader product={product} />

            <ProductDatails product={product} />
        </>
    )
}