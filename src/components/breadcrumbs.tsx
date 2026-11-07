import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import type { LinkOptions } from "@tanstack/react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadcrumbsItem = LinkOptions & { name: string };

interface PageBreadcrumbsProps {
    /** the pages above the current one, from the root down, e.g. Media, Servicii */
    items: BreadcrumbsItem[];
    /** the current page */
    page: string;
}

/** Breadcrumbs bar shown above a page's hero, on the card background. */
export function PageBreadcrumbs(props: PageBreadcrumbsProps) {
    return (
        <div className="flex justify-center px-6 py-3 bg-card">
            <Breadcrumb className="max-w-7xl w-full">
                <BreadcrumbList>
                    {
                        props.items.map(({ name, ...link }) => (
                            <Fragment key={name}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink render={<Link {...link} />}>{name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </Fragment>
                        ))
                    }
                    <BreadcrumbItem>
                        <BreadcrumbPage>{props.page}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
