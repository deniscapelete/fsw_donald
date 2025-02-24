import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import { Categories } from "./components/categories";
import { RestaurantHeader } from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ consumptionMethod: string }>
}

const isConsumptioMethodValid = function (consumptionMethod: string) {
    return ['DINE_IN', "TAKEAWAY"].includes(consumptionMethod.toUpperCase())
}


export default async function RestaurantMenuPage({ params, searchParams }: RestaurantMenuPageProps) {
    const { slug } = await params
    const { consumptionMethod } = await searchParams
    if (!isConsumptioMethodValid(consumptionMethod)) {
        return notFound();
    };
    const restaurant = await db.restaurant.findUnique({
        where: { slug },
        include:
        {
            menuCategories: {
                include: {
                    products: true,
                }
            },
        },
    });
    if (!restaurant) {
        return notFound();
    }
    return (
        <div>
            <RestaurantHeader restaurant={restaurant} />
            <Categories restaurant={restaurant} />
        </div>
    )

}