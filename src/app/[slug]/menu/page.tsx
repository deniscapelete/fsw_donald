interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
}
export default async function RestaurantMenuPage({ params }: RestaurantMenuPageProps) {
    const { slug } = await params
    return (
        <h1> {slug}</h1 >
    )

}