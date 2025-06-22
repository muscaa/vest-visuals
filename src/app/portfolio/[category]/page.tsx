"use client";

import { Main } from "@/components/main";
import { Masonry } from "react-plock";
import { useParams } from "next/navigation";
import {
    useState,
    useEffect
} from "react";
import { GetResponse } from "@/shared/api/portfolio/category";
import {
    PreviewImage,
    PreviewItem
} from "@/components/preview-image";

export default function Page() {
    const { category } = useParams<{ category: string; }>();
    const [items, setItems] = useState<PreviewItem[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch(`/api/portfolio/${category}`);
            const json: GetResponse = await response.json();

            setItems(json.images.map((file) => ({
                src: file,
                alt: "",
                width: 1920,
                height: 1280,
            })));
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
                    render={(item, index) => (
                        <PreviewImage
                            key={index}
                            item={item}
                            className="w-full h-auto"
                        />
                    )}
                />
            </div>
        </Main>
    );
}
