import Image from "next/image";
import Link from "next/link";
import { Category } from "@/shared/config";

export interface CategoryLinkProps {
    category: Category;
    href?: string;
}

export function CategoryLink(props: CategoryLinkProps) {
    return (
        <Link
            href={props.href ?? props.category.portfolioUrl}
            className="
                relative rounded-xl shadow-sm overflow-hidden
                w-full h-40 max-w-128 group
            "
        >
            <div className="absolute size-full overflow-hidden">
                <Image
                    src={props.category.coverImage.src}
                    alt={props.category.coverImage.alt}
                    width={props.category.coverImage.w}
                    height={props.category.coverImage.h}
                    className="
                        size-full object-cover object-center transition-all ease-out
                        not-group-hover:opacity-75 contrast-50 not-group-hover:saturate-0 group-hover:scale-105
                    "
                />
            </div>
            <div
                className="
                    absolute size-full flex flex-col p-2
                    justify-center items-center text-center theme-dark
                "
            >
                <h2>{props.category.name.toUpperCase()}</h2>
            </div>
        </Link>
    );
}
