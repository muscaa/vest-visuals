"use client";

import { Main } from "@/components/main";
import { Masonry } from "react-plock";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
    useState,
    useEffect
} from "react";
import { GetResponse } from "@/shared/api/portfolio/category";

interface Item {
    src: string;
    alt: string;
    width: number;
    height: number;
}

export default function Page() {
    const { category } = useParams<{ category: string; }>();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`/api/portfolio/${category}`);
            const json: GetResponse = await response.json();

            setItems(json.images.map((file) => {
                return {
                    src: file,
                    alt: "",
                    width: 1920,
                    height: 1280,
                };
            }));
        };

        fetchImages();
    }, [category]);

    return (
        <Main>
            <div className="flex justify-center size-full p-2">
                <Masonry
                    items={items}
                    config={{
                        columns: [2, 3, 4, 5],
                        gap: [4, 4, 4, 4, 4],
                        media: [640, 768, 1024, 1408],
                    }}
                    render={(item, idx) => (
                        <Image
                            key={idx}
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="w-full h-auto"
                        />
                    )}
                />
            </div>
        </Main>
    );
}
