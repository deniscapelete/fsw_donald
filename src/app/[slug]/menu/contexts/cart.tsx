"use client"
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
    quantity: number
};

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
    descreaseProductQuantity: (productId: string) => void;
};

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => { },
    addProduct: () => { },
    descreaseProductQuantity: () => { },
});

export function CartProvider({ children }: { children: ReactNode }) {

    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart = () => {
        setIsOpen(prev => !prev)
    };

    const addProduct = (product: CartProduct) => {
        // verificar se o produto já está no carrinho
        // se estiver, aumente a sua quantidade
        //se não estiver, o adicione

        const productIsAlreadyOnTheCart = products.some(prevProduct => prevProduct.id === product.id)
        if (!productIsAlreadyOnTheCart) {
            return setProducts((prevProducts) => [...prevProducts, product])
        }

        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id === product.id) {
                    return {
                        ...prevProduct,
                        quantity: prevProduct.quantity + product.quantity,
                    }
                }
                return prevProduct;
            });
        });
    };

    const descreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {

                if (prevProduct.id != productId) {
                    return prevProduct
                }

                if (prevProduct.quantity === 1) {
                    return prevProduct
                }
                return { ...prevProduct, quantity: prevProduct.quantity - 1 }


            })
        })
    }

    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
            descreaseProductQuantity,
        }}>
            {children}
        </CartContext.Provider>
    )
};

