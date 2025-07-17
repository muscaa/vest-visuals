"use client";

import { Main } from "@/components/main";
import { Masonry } from "react-plock";
import { useParams } from "next/navigation";
import {
    PreviewImage,
    PreviewItem
} from "@/components/preview-image";
import * as types from "@/types/api/images";
import { useQuery } from "@tanstack/react-query";
import { api_client } from "@/utils/client/axios";

export default function Page() {
    const { category } = useParams<{ category: string; }>();
    const { data } = useQuery({
        queryKey: ["portfolio", category],
        queryFn: async () => {
            const { data } = await api_client.post<types.PostResponse, types.PostRequest>("/images", {
                filter: `type = "${category}"`,
            });

            if (!data.success) return [];

            return data.value
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
                } as PreviewItem))) || [];
        },
    });

    return (
        <Main>
            <div className="flex justify-center size-full p-2">
                {
                    data && (
                        <Masonry
                            items={data}
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
                    )
                }
            </div>
        </Main>
    );
}
