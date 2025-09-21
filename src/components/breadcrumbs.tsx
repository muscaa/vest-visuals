"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbPath {
    href: string;
    text: string;
}

export interface BreadcrumbsProps {
    path?: BreadcrumbPath[];
    page: string;
}

export function Breadcrumbs(props: BreadcrumbsProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    props.path && props.path.map((path, index) => (
                        <>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href={path.href}>
                                    {path.text}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                        </>
                    ))
                }
                <BreadcrumbItem>
                    <BreadcrumbPage>{props.page}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
