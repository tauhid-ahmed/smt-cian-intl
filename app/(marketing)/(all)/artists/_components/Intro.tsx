"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Intro() {
    return (
        <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-black">
            <Image
                src="/images/all-artist-page-intro-bg.png"
                alt="Intro Image"
                fill
                priority
                className="size-full object-cover object-top  scale-105"
            />
            {/* Dynamic Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent z-10" />

            {/* Hero Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-yellow-500 uppercase border border-yellow-500/30 bg-yellow-500/10 rounded-full">
                        The Collective
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Beyond the <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">Visionaries</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed">
                        Discover the architects of sound and soul. Our collective brings together the most innovative minds in the industry.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
