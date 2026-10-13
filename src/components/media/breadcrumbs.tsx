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

interface MediaBreadcrumbsProps {
    /** the group the page belongs to, e.g. Servicii or Locații */
    section: LinkOptions & { name: string };
    /** the current page */
    page: string;
}

/** Breadcrumbs bar shown above a media page's hero, on the card background. */
export function MediaBreadcrumbs({ section: { name, ...link }, page }: MediaBreadcrumbsProps) {
    return (
        <div className="flex justify-center px-6 py-3 bg-card">
            <Breadcrumb className="max-w-7xl w-full">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link to="/media" />}>Media</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link {...link} />}>{name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{page}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
