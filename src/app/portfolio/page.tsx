"use client";

import { Main } from "@/components/main";
import { Masonry } from "react-plock";
import Image from "next/image";

export default function Portfolio() {
    const placeholders = [
        {
            src: "/placeholder0.png",
            width: 1200,
            height: 800,
            alt: "Placeholder Image 0",
        },
        /*{
            src: "/placeholder1.png",
            width: 522,
            height: 800,
            alt: "Placeholder Image 1",
        },*/
        {
            src: "/placeholder2.png",
            width: 1200,
            height: 430,
            alt: "Placeholder Image 2",
        },
        {
            src: "/placeholder3.png",
            width: 135,
            height: 135,
            alt: "Placeholder Image 3",
        },
    ];

    const items = [];

    for (let i = 0; i < 40; i++) {
        const rand = Math.floor(Math.random() * placeholders.length);
        items.push(placeholders[rand]);
    }

    return (
        <Main>
            <div className="flex items-center justify-center size-full p-2">
                <Masonry
                    items={items}
                    config={{
                        columns: [2, 3, 4, 5],
                        gap: [4, 4, 4, 4, 4],
                        media: [640, 768, 1024, 1408],
                    }}
                    render={(item, idx) => (
                        <Image key={idx} src={item.src} alt={item.alt} width={item.width} height={item.height} className="w-full h-auto" />
                    )}
                />
            </div>
        </Main>
    );
}
