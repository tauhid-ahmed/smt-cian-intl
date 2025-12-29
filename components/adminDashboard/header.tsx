"use client";

import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/lib/api/authApi";
import Image from "next/image";
import { useAuth } from "@/features/auth/provider/AuthProvider";

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {

    const { openSignUp, openSignIn } = useAuth();
    const { data: meData, isLoading } = useGetMeQuery();

    const signOut = () => {
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <header className="bg-[#1A1A1A] px-6 lg:px-8 lg:min-h-[88px] min-h-[70px] flex items-center justify-between">
            <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="md:hidden text-foreground hover:bg-secondary px-2.5"
            >
                <Menu className="w-5 h-5" />
            </Button>
            <div className="flex-1" />
            <div className="flex-1 flex items-center gap-4 justify-end">
                {isLoading ? (
                    <div className="flex items-center gap-2 animate-pulse">
                        <div className='size-12 bg-gray-200/30 rounded-full' />
                        <div className="flex flex-col gap-1">
                            <span className="text-base h-6 w-24 bg-gray-200/30 rounded-sm whitespace-nowrap text-ellipsis overflow-hidden" />
                            <span className="text-sm h-4 w-16 bg-gray-200/30 rounded-sm whitespace-nowrap text-ellipsis overflow-hidden" />
                        </div>
                    </div>

                ) : meData?.success === false || !meData?.data ? (
                    <div className="ml-4 flex items-center gap-1">
                        <div className="hidden md:block">
                            <Button size="md" onClick={openSignUp}>
                                Start Free Now
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            weight="normal"
                            size="sm"
                            className="text-base"
                            onClick={openSignIn}
                        >
                            Sign In
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Image src={meData?.data?.image || "https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._SX1080_FMjpg_.jpg"} className="size-12 rounded-full object-cover" alt="User avatar" width={48} height={48} />
                        <div className="flex flex-col">
                            <span className="text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                                {meData?.data?.fullName}
                            </span>
                            <span className="text-sm text-gray-100 whitespace-nowrap text-ellipsis overflow-hidden">
                                {meData?.data?.email}
                            </span>
                        </div>
                        <Button variant="default" size="icon" onClick={() => { signOut() }} > <LogOut className="h-4 w-4" /> </Button>
                    </div>
                )}
            </div>
        </header>
    );
}
