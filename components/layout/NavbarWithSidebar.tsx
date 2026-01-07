"use client";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import Logo from "../Logo";
import { useAuth } from "@/features/auth/provider/AuthProvider";
import MusicNav from "./MusicSidebar";
import { Input } from "../ui/input";
import { LucideSearch } from "lucide-react";
import { useGetMeQuery } from "@/lib/api/authApi";
import Image from "next/image";

export default function NavbarWithSidebar() {
    const { openSignUp, openSignIn } = useAuth();
    const { data: meData, isLoading } = useGetMeQuery();

    return (
        <header className="bg-accent sticky top-0 z-50 shadow -mx-6 px-6">
            <Container>
                <nav className="py-3 flex flex-wrap justify-between items-center">
                    <div className="flex flex-wrap items-center justify-between flex-1 gap-4">

                        <div className="lg:opacity-0 lg:pointer-events-none lg:user-select-none flex flex-wrap items-center gap-2">
                            <MusicNav />
                            <Logo />
                        </div>
                    </div>


                    <div className="flex gap-4 justify-end">
                        {isLoading ? (
                            <div className="flex items-center gap-2 animate-pulse">
                                <div className='size-10 bg-gray-200/30 rounded-full' />
                                <div className="hidden sm:flex flex-col gap-1">
                                    <span className="text-sm h-4 w-20 bg-gray-200/30 rounded-sm" />
                                </div>
                            </div>
                        ) : meData?.success === false || !meData?.data ? (
                            <div className="flex gap-4">
                                <Button size="sm" onClick={openSignUp}>
                                    Start Free Now
                                </Button>
                                <Button
                                    variant="ghost"
                                    weight="normal"
                                    size="sm"
                                    className="text-base"
                                    onClick={openSignIn}
                                >
                                    Sign in
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Image
                                    src={meData?.data?.image || "https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._SX1080_FMjpg_.jpg"}
                                    className="size-10 rounded-full object-cover ring-2 ring-yellow-500/20"
                                    alt="User avatar"
                                    width={40}
                                    height={40}
                                />
                                <div className="hidden sm:flex flex-col">
                                    <span className="text-sm font-bold text-white whitespace-nowrap">
                                        {meData?.data?.fullName}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
                                        {meData?.data?.role?.toLowerCase()}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </Container>
        </header>
    );
}
