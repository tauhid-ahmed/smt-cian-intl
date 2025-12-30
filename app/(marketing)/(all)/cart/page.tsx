'use client'

import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/ui/button';

import { MinusIcon, PlusIcon, XIcon } from 'lucide-react';
import React from 'react';

const Cart = () => {
    return (
        <div className="grid grid-cols-6 gap-6 lg:p-12 xl:p-14 w-full lg:max-w-7xl mx-auto">
            <div className="col-span-4">
                <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <section
                            key={i}
                            className="flex items-center justify-between p-8 border rounded-lg bg-gray-900"
                        >
                            <div className="flex items-center gap-8">
                                <img
                                    className="h-36 aspect-square rounded-lg object-cover"
                                    src="https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._SX1080_FMjpg_.jpg"
                                    alt=""
                                />
                                <div className="flex flex-col gap-2 h-full">
                                    <h1 className="text-xl font-semibold">Casting Crowns</h1>
                                    <p className="text-sm text-gray-400">The Altar and The Door</p>
                                    <div className="flex items-center">
                                        <StarRating rating={4} />
                                        <p className="text-xs text-gray-400 ml-2">(234 reviews)</p>
                                    </div>
                                    <p className="text-lg font-semibold">$234</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-8">
                                <XIcon />
                                <div className="flex items-stretch">
                                    <button className="p-5 border hover:bg-gray-700">
                                        <PlusIcon />
                                    </button>
                                    <input
                                        type="number"
                                        name=""
                                        id=""
                                        className="w-24 h-full block py-5 px-3 border"
                                        defaultValue="1"
                                    />
                                    <button className="p-5 border hover:bg-gray-700">
                                        <MinusIcon />
                                    </button>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
            <div className="col-span-2">
                <div className="bg-gray-900 p-6 rounded-lg space-y-4 h-full">
                    <h1 className="text-2xl font-semibold">Product Details</h1>
                    <p>3 items in cart</p>
                    <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between"
                            >
                                <p>Product {i + 1}</p>
                                <p>$234</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                        <p className="font-semibold">Shipping</p>
                        <p>$234</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Subtotal</p>
                        <p>$234</p>
                    </div>
                    <div className="py-2">
                        <Button className="w-full">Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;