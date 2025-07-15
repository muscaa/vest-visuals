"use client";

import { Main } from "@/components/main";
import { Masonry } from "react-plock";
import { useParams } from "next/navigation";
import {
    useState,
    useEffect
} from "react";
import {
    PreviewImage,
    PreviewItem
} from "@/components/preview-image";
import * as types from "@/types/api/images";

export default function Page() {
    const { category } = useParams<{ category: string; }>();
    const [items, setItems] = useState<PreviewItem[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch("/api/images", {
                method: "POST",
                body: JSON.stringify({
                    filter: `type = "${category}"`,
                } as types.PostRequest),
            });
            const json: types.PostResponse = await response.json();

            if (json.success) {
                setItems(json.value
                    ?.map((record) => record.items)
                    .flatMap((items) => items.map((item) => ({
                        alt: item.alt,
                        preview: {
                            src: `https://s3.vestvisuals.ro/public/images/${item.src}_small.jpg`,
                            width: item.sizes.small?.w,
                            height: item.sizes.small?.h,
                        },
                        display: {
                            src: `https://s3.vestvisuals.ro/public/images/${item.src}_large.jpg`,
                            width: item.sizes.large?.w,
                            height: item.sizes.large?.h,
                        },
                    } as PreviewItem))) || []
                );
            }

            /*const response = await fetch(`/api/portfolio/${category}`);
            const json = await response.json();

            setItems(json.images.map((file: string) => ({
                src: file,
                alt: "",
                width: 1920,
                height: 1280,
            })));*/
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
                            index={index}
                            className="w-full h-auto"
                        />
                    )}
                />
            </div>
        </Main>
    );
}
