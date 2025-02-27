import { useContext } from "react"

import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { formatCurrency } from "@/helpers/format-currency";

import { CartProductItem } from "../../cart-product-item";
import { CartContext } from "../contexts/cart"
import { FinishOrderButton } from "./finish-order-button";

const CartSheet = () => {
    const { isOpen, toggleCart, products, total } = useContext(CartContext);
    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[80%] rounded-s-md">
                <SheetHeader>
                    <SheetTitle className="text-left">Sacola</SheetTitle>
                </SheetHeader>
                <div className="py-5 flex flex-col h-full" >
                    <div className="flex-auto">
                        {products.map(product => (
                            <CartProductItem key={product.id} product={product} />
                        ))}
                    </div>
                    <Card className="mb-6">
                        <CardContent className="p-5">
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="font-semibold text-sm">{formatCurrency(total)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <FinishOrderButton />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CartSheet