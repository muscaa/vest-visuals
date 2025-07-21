"use client";

import { Main } from "@/components/main";
import { Masonry } from "react-plock";
import { useParams } from "next/navigation";
import {
    PreviewImage,
    PreviewItem
} from "@/components/preview-image";
import * as types from "@/types/api/media";
import { useQuery } from "@tanstack/react-query";
import { api_client } from "@/utils/client/axios";

export default function Page() {
    const { category } = useParams<{ category: string; }>();
    const { data } = useQuery({
        queryKey: ["portfolio", category],
        queryFn: async () => {
            const { data } = await api_client.post<types.PostResponse, types.PostRequest>("/media", {
                category,
                variants: ["original"],
            });

            if (!data.success) return [];

            return data.values
                ?.map((value) => value.original!)
                .map((variant) => ({
                    alt: variant.id,
                    preview: {
                        src: variant.file,
                        width: 512,
                        height: 512,
                    },
                    display: {
                        src: variant.file,
                        width: 512,
                        height: 512,
                    },
                } as PreviewItem))
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
