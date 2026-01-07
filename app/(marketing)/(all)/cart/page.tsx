"use client";

import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, Loader2, ShoppingCart, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    useGetCartQuery,
    useUpdateCartMutation,
    useRemoveFromCartMutation,
} from "@/lib/api/cartApi";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

const CartPage = () => {
    const { data: cartResponse, isLoading, isError } = useGetCartQuery();
    const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
    const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();

    const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            await updateCart({ itemId, quantity: newQuantity }).unwrap();
            toast.success("Cart updated");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update cart");
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            await removeFromCart({ itemId }).unwrap();
            toast.success("Item removed from cart");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to remove item");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mb-4" />
                <p className="text-gray-400">Loading your cart...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <p className="text-red-500 mb-4">Failed to load cart. Please try again.</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    const cart = cartResponse?.data;
    const items = cart?.items || [];

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-gray-700 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
                <Link href="/shop">
                    <Button className="bg-white text-black hover:bg-gray-200">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <Section>
            <Container>
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-4 space-y-6">
                        {items.map((item) => (
                            <section
                                key={item.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border border-zinc-800 rounded-xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors gap-6"
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="relative h-24 sm:h-32 aspect-square rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                                        <Image
                                            src={item?.image || "/images/placeholder.jpg"}
                                            alt={item?.title || "Product"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <h2 className="text-lg sm:text-xl font-semibold truncate leading-tight">
                                            {item?.title}
                                        </h2>
                                        <p className="text-sm text-gray-400">
                                            Premium Collection
                                        </p>
                                        <div className="flex items-center mt-1">
                                            <StarRating rating={4.8} size="sm" />
                                            <p className="text-[10px] text-gray-500 ml-2 uppercase tracking-wider">
                                                (Verified)
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-baseline gap-2">
                                            <p className="text-lg font-bold text-white">
                                                ${item?.price.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 self-stretch">
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        disabled={isRemoving}
                                        className="text-gray-500 hover:text-red-500 transition-colors p-2 -mr-2 bg-zinc-800/50 sm:bg-transparent rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden bg-black h-10">
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            disabled={isUpdating || item.quantity <= 1}
                                            className="px-3 hover:bg-zinc-800 transition-colors disabled:opacity-50"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <div className="w-12 text-center bg-transparent border-none text-sm font-medium flex items-center justify-center">
                                            {item.quantity}
                                        </div>
                                        <button
                                            onClick={() => handleUpdateQuantity(item?.id, item?.quantity + 1)}
                                            disabled={isUpdating || item?.quantity >= item?.stock}
                                            className="px-3 hover:bg-zinc-800 transition-colors border-l border-zinc-700 disabled:opacity-50"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-2">
                        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-6 sticky top-24 shadow-xl">
                            <h2 className="text-xl font-bold border-b border-zinc-800 pb-4">Order Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal ({cart?.totalItems || 0} items)</span>
                                    <span>${(cart?.totalAmount || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-green-500 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Estimated Tax</span>
                                    <span>$0.00</span>
                                </div>
                            </div>

                            <div className="border-t border-zinc-800 pt-4">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span className="text-yellow-500">${(cart?.totalAmount || 0).toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block w-full pt-2">
                                <Button className="w-full bg-white text-black hover:bg-zinc-200 py-6 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98]">
                                    Checkout Now
                                </Button>
                            </Link>

                            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                                <Shield className="w-3 h-3" />
                                Secure Checkout Guaranteed
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default CartPage;