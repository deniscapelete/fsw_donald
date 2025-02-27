"use client"
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, 'id' | 'name' | 'price' | 'imageUrl'> {
    quantity: number
};

export interface ICartContext {
    isOpen: boolean;
    products: CartProduct[];
    total: number;
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
    descreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;

};

export const CartContext = createContext<ICartContext>({
    isOpen: false,
    products: [],
    total: 0,
    toggleCart: () => { },
    addProduct: () => { },
    descreaseProductQuantity: () => { },
    increaseProductQuantity: () => { },
    removeProduct: () => { },
});

export function CartProvider({ children }: { children: ReactNode }) {

    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const total = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0)

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

    const increaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if (prevProduct.id === productId) {
                    return { ...prevProduct, quantity: prevProduct.quantity + 1 }
                }
                return prevProduct
            })
        })
    }

    const removeProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id != productId));
    }

    return (
        <CartContext.Provider value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
            descreaseProductQuantity,
            increaseProductQuantity,
            removeProduct,
            total,
        }}>
            {children}
        </CartContext.Provider>
    )
};

