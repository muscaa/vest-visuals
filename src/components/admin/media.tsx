import { Badge } from "../ui/badge";

export interface MediaVariant {
    /** e.g. "medium", "large" */
    tag: string;
    url: string;
}

/** Links to every variant of stored media: an asset's, a portfolio photo's, an album entry's. */
export function MediaVariants(props: { variants: MediaVariant[] }) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {
                props.variants.map((variant) => (
                    <Badge
                        key={variant.tag}
                        variant="outline"
                        render={<a href={variant.url} target="_blank" rel="noopener noreferrer" />}
                    >
                        {variant.tag}
                    </Badge>
                ))
            }
        </div>
    );
}
