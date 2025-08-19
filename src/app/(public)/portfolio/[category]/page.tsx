"use client";

import { Main } from "@/components/main";
import { Masonry } from "react-plock";
import { useParams } from "next/navigation";
import { PreviewImage } from "@/components/preview-image";
import { usePortfolio } from "@/hooks/usePortfolio";

export default function Page() {
    const { category } = useParams<{ category: string; }>();
    const { data } = usePortfolio(category);

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
                                useBalancedLayout: true,
                            }}
                            render={(item, index) => (
                                <PreviewImage
                                    key={index}
                                    item={item}
                                    index={index}
                                />
                            )}
                        />
                    )
                }
            </div>
        </Main>
    );
}
